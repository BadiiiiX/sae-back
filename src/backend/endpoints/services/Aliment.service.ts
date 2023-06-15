import {Service} from "fastify-decorators";
import {AlimentBodyCreateSchema} from "../schemas/Aliment.schema";
import {Aliment, Prisma} from "@prisma/client";
import prisma from "../../../clients/Prisma";
import {ApiError} from "../Errors/ApiError";
import CategoryService from "./Category.service";
import SubCategoryService from "./SubCategory.service";
import SubSubCategoryService from "./SubSubCategory.service";

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
        if(!await AlimentService.isAlimentExist(code)) {
            throw new ApiError("Aliment doesn't exist", 404);
        }

        await prisma.aliment.delete({
            where: {
                code
            }
        });
    }

    async getAlimentByCategory(code: string): Promise<Partial<Aliment[]>> {

        const getAlimentByCategoryCaller = async (categoryCode: string): Promise<Partial<Aliment[]>> => {
            if(!await CategoryService.isCategoryExist(categoryCode)) {
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
            if(!await SubCategoryService.isSubCategoryExist(subCategoryCode)) {
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
}