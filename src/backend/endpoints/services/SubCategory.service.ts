import {Service} from "fastify-decorators";
import {Aliment_SubCategory, Prisma} from "@prisma/client";
import prisma from "../../../clients/Prisma";
import {SubCategoryBodyCreateSchema} from "../schemas/SubCategory.schema";
import {ApiError} from "../Errors/ApiError";
import CategoryService from "./Category.service";

@Service()
export default class SubCategoryService {

    public static SUB_CATEGORY_CODE_LENGTH = 4;

    public static SubCategoryPublicSelect: Prisma.Aliment_SubCategorySelect = {
        code: true,
        name: true,
        Aliment_Category: true,
        subSubCategories: true,
    }

    public static SubCategoryPublicBaseSelect: Prisma.Aliment_CategorySelect = {
        code: true,
        name: true
    }

    public static async isSubCategoryExist(code: string): Promise<boolean> {
        const subCategory = await prisma.aliment_SubCategory.findFirst({
            where: {
                code
            }
        });

        return subCategory !== null;
    }

    async createSubCategory(data: SubCategoryBodyCreateSchema): Promise<Partial<Aliment_SubCategory>> {

        if (!await CategoryService.isCategoryExist(data.categoryCode)) {
            throw new ApiError("Category doesn't exist", 404);
        }

        if (await SubCategoryService.isSubCategoryExist(data.code)) {
            throw new ApiError("SubCategory code already exists", 409);
        }

        return prisma.aliment_SubCategory.create({
            data: {
                code: data.code,
                name: data.name,
                alimentCategoryCode: data.categoryCode
            }
        });

    }

    async getAllSubCategories(showAllData: boolean = true): Promise<Partial<Aliment_SubCategory[]>> {
        return prisma.aliment_SubCategory.findMany({
            select: showAllData ? SubCategoryService.SubCategoryPublicSelect : SubCategoryService.SubCategoryPublicBaseSelect
        }) as unknown as Partial<Aliment_SubCategory[]>;
    }

    async getSubCategory(code: string): Promise<Partial<Aliment_SubCategory>> {

        const subCategory = await prisma.aliment_SubCategory.findUnique({
            where: {
                code
            },
            select: SubCategoryService.SubCategoryPublicSelect
        });

        if (!subCategory) {
            throw new ApiError("SubCategory doesn't exist", 404);
        }

        return subCategory;
    }

    async deleteSubCategory(code: string): Promise<Partial<void>> {

        //TODO : delete all subSubCategories

        if (!await SubCategoryService.isSubCategoryExist(code)) {
            throw new ApiError("SubCategory doesn't exist", 404);
        }

        await prisma.aliment_SubCategory.delete({
            where: {
                code
            }
        });
    }

}