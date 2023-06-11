import {Service} from "fastify-decorators";
import {AlimentBodyCreateSchema} from "../schemas/Aliment.schema";
import {Aliment, Prisma} from "@prisma/client";
import prisma from "../../../clients/Prisma";
import {ApiError} from "../Errors/ApiError";

@Service()
export default class AlimentService {

    public static AlimentPublicSelect: Prisma.AlimentSelect = {
        code: true,
        name: true,
        category: true,
        subCategory: true,
        subSubCategory: true,
    }

    public static AlimentPublicSelectWithoutSubSubCategory: Prisma.AlimentSelect = {
        code: true,
        name: true,
        category: true,
        subCategory: true,
        subSubCategory: false,
    }

    async createAliment(data: AlimentBodyCreateSchema): Promise<Partial<Aliment>> {

        const aliment = await prisma.aliment.findUnique({
            where: {
                code: data.code
            }
        });

        if (aliment !== null) {
            throw new ApiError("Aliment code already exists", 409);
        }

        //TODO : Get Category, SubCategory & SubSubCategory and do error handling

        const addSubSubCategory = () => {
            if (data.subSubCategoryCode !== "000000") {
                return {
                    subSubCategory: {
                        connect: {
                            code: data.subSubCategoryCode
                        }
                    }
                }
            }
            return {};
        }

        return prisma.aliment.create({
            data: {
                code: data.code,
                name: data.name,
                category: {
                    connect: {
                        code: data.categoryCode
                    }
                },
                subCategory: {
                    connect: {
                        code: data.subCategoryCode
                    }
                },
                ...addSubSubCategory()
            },
            select: AlimentService.AlimentPublicSelect
        });

    }

}