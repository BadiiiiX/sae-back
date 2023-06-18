import {Service} from "fastify-decorators";
import prisma from "../../../clients/Prisma";
import {Prisma, Aliment_Category} from "@prisma/client";
import {CategoryBodyCreateSchema} from "../schemas/Category.schema";
import {ApiError} from "../Errors/ApiError";

@Service()
export default class CategoryService {

    public static CATEGORY_CODE_LENGTH = 2;

    public static CategoryPublicSelect: Prisma.Aliment_CategorySelect = {
        code: true,
        name: true,
        aliments: true,
        subCategories: {
            select: {
                code: true,
                name: true,
                Aliment_Category: true,
                subSubCategories: true,
            } //SubCategoryService.SubCategoryPublicSelect
        }
    }

    public static CategoryPublicBaseSelect: Prisma.Aliment_CategorySelect = {
        code: true,
        name: true
    }

    public static async isCategoryExist(code: string): Promise<boolean> {
        const category = await prisma.aliment_Category.findFirst({
            where: {
                code
            }
        });

        return category !== null;
    }

    async createCategory(data: CategoryBodyCreateSchema): Promise<Partial<Aliment_Category>> {

        const {code, name} = data;

        if (await CategoryService.isCategoryExist(code)) {
            throw new ApiError("Category code already exists", 409);
        }

        return prisma.aliment_Category.create({
            data: {
                code, name
            }
        });

    }

    async getCategory(code: string): Promise<Partial<Aliment_Category>> {
        const category = await prisma.aliment_Category.findUnique({
            where: {
                code: code
            },
            select: CategoryService.CategoryPublicSelect
        });

        if (category === null) {
            throw new ApiError("Category doesn't exist", 404);
        }

        return category;
    }

    async getAllCategories(showAllData: boolean = true): Promise<Partial<Aliment_Category[]>> {
        return prisma.aliment_Category.findMany({
            select: showAllData ? CategoryService.CategoryPublicSelect : CategoryService.CategoryPublicBaseSelect
        }) as unknown as Partial<Aliment_Category[]>;
    }

    async deleteCategory(code: string): Promise<Partial<void>> {

        //TODO delete all subcategories and subsubcategories before !

        if (!await CategoryService.isCategoryExist(code)) {
            throw new ApiError("Category doesn't exist", 404);
        }

        await prisma.aliment_Category.delete({
            where: {
                code
            }
        });
    }
}