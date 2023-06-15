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

        if(data.subSubCategoryCode !== SubSubCategoryService.NULL_CODE_VALUE && !await SubSubCategoryService.isSubSubCategoryExist(data.subSubCategoryCode)) {
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

}