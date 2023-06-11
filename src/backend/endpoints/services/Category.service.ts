import {Service} from "fastify-decorators";
import prisma from "../../../clients/Prisma";
import {Prisma, Aliment_Category} from "@prisma/client";
import {
    CategoryBodyCreateSchema, CategoryBodyDeleteSchema
} from "../schemas/Category.schema";
import {ApiError} from "../Errors/ApiError";

@Service()
export default class CategoryService {

    public static CategoryPublicSelect: Prisma.Aliment_CategorySelect = {
        code: true,
        name: true,
        aliments: true,
        subCategories: true
    }

    async createCategory(data: CategoryBodyCreateSchema): Promise<Partial<Aliment_Category>> {

        const {code, name} = data;

        const category = await prisma.aliment_Category.findUnique({
            where: {
                code,
            }
        })

        if (category !== null) {
            throw new ApiError("Category code already exists", 409);
        }

        return prisma.aliment_Category.create({
            data: {
                code, name
            },

            select: CategoryService.CategoryPublicSelect
        });

    }

    async getCategory(code: string): Promise<Partial<Aliment_Category>> {
        const result = await prisma.aliment_Category.findUnique({
            where: {
                code: code
            },
            select: CategoryService.CategoryPublicSelect
        });

        if (!result) throw new ApiError("Category doesn't exist", 404);

        return result;
    }

    async getAllCategories(): Promise<Partial<Aliment_Category[]>> {
        // @ts-ignore
        return prisma.aliment_Category.findMany({
            select: CategoryService.CategoryPublicSelect
        });
    }

    async deleteCategory(data: CategoryBodyDeleteSchema): Promise<Partial<void>> {

        //TODO delete all subcategories and subsubcategories before !

        const code = data;

        const category = await prisma.aliment_Category.findUnique({
            where: {
                code
            }
        });

        if (!category) {
            throw new ApiError("Category doesn't exist", 404);
        }

        await prisma.aliment_Category.delete({
            where: {
                code
            }
        });
    }
}