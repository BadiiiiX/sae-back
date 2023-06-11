import {Static, Type} from "@sinclair/typebox";
import {FastifySchema} from "fastify";
import {AlreadyExistsConflictSchema} from "./Global.schema";

const SubCategoryBodyCreateSchema = Type.Object({
    code: Type.String(),
    name: Type.String(),
    categoryCode: Type.String()
})

const SubCategoryBodyDeleteSchema = Type.String();

export type SubCategoryBodyCreateSchema = Static<typeof SubCategoryBodyCreateSchema>;
export type SubCategoryBodyDeleteSchema = Static<typeof SubCategoryBodyDeleteSchema>;

export const SubCategoryCreateSchema: FastifySchema = {
    tags: ["SubCategory"],
    summary: "create a subcategory",
    operationId: "createSubCategory",
    body: SubCategoryBodyCreateSchema,
    response: {
        200: SubCategoryBodyCreateSchema,
        409: AlreadyExistsConflictSchema
    }
}