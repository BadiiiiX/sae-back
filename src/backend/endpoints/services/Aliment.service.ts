import {Service} from "fastify-decorators";
import {AlimentBodyCreateSchema, AlimentBodyGetByPaginationSchema} from "../schemas/Aliment.schema";
import {Aliment, Prisma} from "@prisma/client";
import prisma from "../../../clients/Prisma";
import {ApiError} from "../Errors/ApiError";
import CategoryService from "./Category.service";
import SubCategoryService from "./SubCategory.service";
import SubSubCategoryService from "./SubSubCategory.service";
import Fuse from "fuse.js";
import { SurveyRest } from "../..";

@Service()
export default class AlimentService {

    public static AlimentPublicSelect: Prisma.AlimentSelect = {
        code: true,
        name: true,
        category: true,
        subCategory: true,
        subSubCategory: true,
    }

    public static AlimentPublicSelectWithoutCategory: Prisma.AlimentSelect = {
        code: true,
        name: true,
    }

    public static async isAlimentExist(code: string): Promise<boolean> {
        const aliment = await prisma.aliment.findFirst({
            where: {
                code
            }
        });

        return aliment !== null;
    }

    async createAliment(data: AlimentBodyCreateSchema): Promise<Partial<Aliment>> {

        if (await AlimentService.isAlimentExist(data.code)) {
            throw new ApiError("Aliment code already exists", 409);
        }

        if (!await CategoryService.isCategoryExist(data.categoryCode)) {
            throw new ApiError("Category doesn't exist", 404);
        }

        if (!await SubCategoryService.isSubCategoryExist(data.subCategoryCode)) {
            throw new ApiError("SubCategory doesn't exist", 404);
        }

        if (data.subSubCategoryCode !== SubSubCategoryService.NULL_CODE_VALUE && !await SubSubCategoryService.isSubSubCategoryExist(data.subSubCategoryCode)) {
            throw new ApiError("SubSubCategory doesn't exist", 404);
        }

        return prisma.aliment.create({
            data: {
                code: data.code,
                name: data.name,
                alimentCategoryCode: data.categoryCode,
                alimentSubCategoryCode: data.subCategoryCode,
                alimentSubSubCategoryCode: data.subSubCategoryCode !== SubSubCategoryService.NULL_CODE_VALUE ? data.subSubCategoryCode : null,
            }
        });
    }

    async getAlimentByCode(code: string): Promise<Partial<Aliment>> {
        const aliment = await prisma.aliment.findFirst({
            where: {
                code
            },
            select: AlimentService.AlimentPublicSelect
        });

        if (aliment === null) {
            throw new ApiError("Aliment doesn't exist", 404);
        }

        return aliment as unknown as Aliment;
    }

    async getAllAliments(): Promise<Partial<Aliment[]>> {
        return prisma.aliment.findMany({
            select: AlimentService.AlimentPublicSelect
        }) as unknown as Aliment[];
    }

    async deleteAliment(code: string): Promise<void> {
        if (!await AlimentService.isAlimentExist(code)) {
            throw new ApiError("Aliment doesn't exist", 404);
        }

        await prisma.aliment.delete({
            where: {
                code
            }
        });
    }

    async getAlimentByAnyCategory(code: string): Promise<Partial<Aliment[]>> {

        const getAlimentByCategoryCaller = async (categoryCode: string): Promise<Partial<Aliment[]>> => {
            if (!await CategoryService.isCategoryExist(categoryCode)) {
                throw new ApiError("Category doesn't exist", 404);
            }

            return prisma.aliment.findMany({
                where: {
                    alimentCategoryCode: categoryCode
                },
                select: AlimentService.AlimentPublicSelectWithoutCategory
            }) as unknown as Aliment[];
        }

        const getAlimentBySubCategoryCaller = async (subCategoryCode: string): Promise<Partial<Aliment[]>> => {
            if (!await SubCategoryService.isSubCategoryExist(subCategoryCode)) {
                throw new ApiError("SubCategory doesn't exist", 404);
            }

            return prisma.aliment.findMany({
                where: {
                    alimentSubCategoryCode: subCategoryCode
                },
                select: AlimentService.AlimentPublicSelectWithoutCategory
            }) as unknown as Aliment[];
        }

        const getAlimentBySubSubCategoryCaller = async (subSubCategoryCode: string): Promise<Partial<Aliment[]>> => {
            if (!await SubSubCategoryService.isSubSubCategoryExist(subSubCategoryCode)) {
                throw new ApiError("SubSubCategory doesn't exist", 404);
            }

            return prisma.aliment.findMany({
                where: {
                    alimentSubSubCategoryCode: subSubCategoryCode
                },
                select: AlimentService.AlimentPublicSelectWithoutCategory
            }) as unknown as Aliment[];
        }

        switch (code.length) {
            case CategoryService.CATEGORY_CODE_LENGTH:
                return getAlimentByCategoryCaller(code);
            case SubCategoryService.SUB_CATEGORY_CODE_LENGTH:
                return getAlimentBySubCategoryCaller(code);
            case SubSubCategoryService.SUB_SUB_CATEGORY_CODE_LENGTH:
                return getAlimentBySubSubCategoryCaller(code);
            default:
                throw new ApiError("Code doesn't exist", 404);
        }

    }

    async getAlimentByToken(token: string): Promise<Aliment[]> {

        const alimentList: Aliment[] = await this.getAllAliments();

        const fuse = new Fuse(alimentList, {
            keys: ["code", "name"]
        });

        return fuse.search(token).map((result) => result.item);
    }

    async getAlimentsPagination({code, page}: AlimentBodyGetByPaginationSchema) : Promise<{aliments: Aliment[], nextPage: boolean}> {

        let categoryToFilter;

        const ALIMENT_PER_PAGE = 30;


        switch (code.length) {
            case CategoryService.CATEGORY_CODE_LENGTH:
                if(CategoryService.isCategoryExist(code)) {
                    categoryToFilter = {alimentCategoryCode: code}
                    break;
                }
            case SubCategoryService.SUB_CATEGORY_CODE_LENGTH:
                if(SubCategoryService.isSubCategoryExist(code)) {
                    categoryToFilter = {alimentSubCategoryCode: code}
                    break;
                }
            case SubSubCategoryService.SUB_SUB_CATEGORY_CODE_LENGTH:
                if(SubSubCategoryService.isSubSubCategoryExist(code)) {
                    categoryToFilter = {alimentSubSubCategoryCode: code}
                    break;
                }
            default:
                throw new ApiError("Code doesn't exist", 404);
        }

        const res = await prisma.aliment.findMany({
            where: categoryToFilter,
            select: AlimentService.AlimentPublicSelectWithoutCategory
        })
        

        if(res.length < (page-1)*ALIMENT_PER_PAGE) {
            throw new ApiError("No more data", 404);
        }

        const canHaveNextPage = (page * ALIMENT_PER_PAGE) < res.length 

        const toReturn = {
            aliments: [],
            nextPage: canHaveNextPage
        }

        toReturn.aliments = res.slice((ALIMENT_PER_PAGE*(page-1)), ALIMENT_PER_PAGE*page)

        return toReturn;
    }
}