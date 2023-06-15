import {Service} from "fastify-decorators";
import {Aliment_SubSubCategory, Prisma} from "@prisma/client";
import prisma from "../../../clients/Prisma";
import {ApiError} from "../Errors/ApiError";
import {SubSubCategoryBodyCreateSchema} from "../schemas/SubSubCategory.schema";
import SubCategoryService from "./SubCategory.service";

@Service()
export default class SubSubCategoryService {

    public static NULL_CODE_VALUE = "000000";

    public static SubSubCategoryPublicSelect: Prisma.Aliment_SubSubCategorySelect = {
        code: true,
        name: true,
        Aliment_SubCategory: true,
    }

    public static async isSubSubCategoryExist(code: string): Promise<boolean> {
        const subSubCategory = await prisma.aliment_SubSubCategory.findFirst({
            where: {
                code
            }
        });

        return subSubCategory !== null;
    }

    async createSubSubCategory(data: SubSubCategoryBodyCreateSchema): Promise<Partial<Aliment_SubSubCategory>> {

        if (await SubSubCategoryService.isSubSubCategoryExist(data.code)) {
            throw new ApiError("SubSubCategory code already exists", 409);
        }

        if (!await SubCategoryService.isSubCategoryExist(data.subCategoryCode)) {
            throw new ApiError("SubCategory doesn't exist", 404);
        }

        return prisma.aliment_SubSubCategory.create({
            data: {
                code: data.code,
                name: data.name,
                alimentSubCategoryCode: data.subCategoryCode,
            }
        });

    }

    async getAllSubSubCategories(): Promise<Partial<Aliment_SubSubCategory[]>> {
        // @ts-ignore
        return prisma.aliment_SubSubCategory.findMany({
            select: SubSubCategoryService.SubSubCategoryPublicSelect
        });
    }

    async getSubSubCategory(code: string): Promise<Partial<Aliment_SubSubCategory>> {

        const subSubCategory = await prisma.aliment_SubSubCategory.findUnique({
            where: {
                code
            }
        });

        if (!subSubCategory) {
            throw new ApiError("SubSubCategory doesn't exist", 404);
        }

        return subSubCategory;
    }

    async deleteSubSubCategory(code: string): Promise<Partial<void>> {

        if(!await SubSubCategoryService.isSubSubCategoryExist(code)) {
            throw new ApiError("SubSubCategory doesn't exist", 404);
        }

        await prisma.aliment_SubCategory.delete({
            where: {
                code
            },
        });
    }

}