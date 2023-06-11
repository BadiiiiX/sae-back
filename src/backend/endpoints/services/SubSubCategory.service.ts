import {Service} from "fastify-decorators";
import {Aliment_SubSubCategory, Prisma} from "@prisma/client";
import prisma from "../../../clients/Prisma";
import {ApiError} from "../Errors/ApiError";
import {SubSubCategoryBodyCreateSchema} from "../schemas/SubSubCategory.schema";

@Service()
export default class SubSubCategoryService {

    public static SubSubCategoryPublicSelect: Prisma.Aliment_SubSubCategorySelect = {
        code: true,
        name: true,
        Aliment_SubCategory: true,
    }

    async createSubSubCategory(data: SubSubCategoryBodyCreateSchema): Promise<Partial<Aliment_SubSubCategory>> {

        const subSubCategory = await prisma.aliment_SubSubCategory.findUnique({
            where: {
                code: data.code
            }
        });

        if (subSubCategory !== null) {
            throw new ApiError("SubSubCategory code already exists", 409);
        }

        const subCategory = await prisma.aliment_SubCategory.findUnique({
            where: {
                code: data.subCategoryCode
            }
        });

        if (!subCategory) {
            throw new ApiError("SubCategory doesn't exist", 404);
        }

        return prisma.aliment_SubSubCategory.create({
            data: {
                code: data.code,
                name: data.name,
                Aliment_SubCategory: {
                    connect: {
                        code: data.subCategoryCode
                    }
                }
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

        //TODO : delete all subSubCategories

        const subSubCategory = await prisma.aliment_SubSubCategory.findUnique({
            where: {
                code
            }
        })

        if (!subSubCategory) {
            throw new ApiError("SubCategory doesn't exist", 404);
        }

        await prisma.aliment_SubCategory.delete({
            where: {
                code
            }
        });
    }

}