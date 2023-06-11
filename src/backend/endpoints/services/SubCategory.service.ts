import {Service} from "fastify-decorators";
import {Aliment_SubCategory, Prisma} from "@prisma/client";
import prisma from "../../../clients/Prisma";
import {SubCategoryBodyCreateSchema} from "../schemas/SubCategory.schema";
import {ApiError} from "../Errors/ApiError";

@Service()
export default class SubCategoryService {

    public static SubCategoryPublicSelect: Prisma.Aliment_SubCategorySelect = {
        code: true,
        name: true,
        Aliment_Category: true,
        subSubCategories: true,
    }

    async createSubCategory(data: SubCategoryBodyCreateSchema): Promise<Partial<Aliment_SubCategory>> {

        const subCategory = await prisma.aliment_SubCategory.findUnique({
            where: {
                code: data.code
            }
        });

        if (subCategory !== null) {
            throw new ApiError("SubCategory code already exists", 409);
        }

        const category = await prisma.aliment_Category.findUnique({
            where: {
                code: data.categoryCode
            }
        });

        if (!category) {
            throw new ApiError("Category doesn't exist", 404);
        }

        return prisma.aliment_SubCategory.create({
            data: {
                code: data.code,
                name: data.name,
                Aliment_Category: {
                    connect: {
                        code: data.categoryCode
                    }
                }
            }
        });

    }

    async getAllSubCategories(): Promise<Partial<Aliment_SubCategory[]>> {
        // @ts-ignore
        return prisma.aliment_SubCategory.findMany({
            select: SubCategoryService.SubCategoryPublicSelect
        });
    }

    async getSubCategory(code: string): Promise<Partial<Aliment_SubCategory>> {

        const subCategory = await prisma.aliment_SubCategory.findUnique({
            where: {
                code
            }
        });

        if (!subCategory) {
            throw new ApiError("SubCategory doesn't exist", 404);
        }

        return subCategory;
    }

    async deleteSubCategory(code: string): Promise<Partial<void>> {

        //TODO : delete all subSubCategories

        const subCategory = await prisma.aliment_SubCategory.findUnique({
            where: {
                code
            }
        })

        if (!subCategory) {
            throw new ApiError("SubCategory doesn't exist", 404);
        }

        await prisma.aliment_SubCategory.delete({
            where: {
                code
            }
        });
    }

}