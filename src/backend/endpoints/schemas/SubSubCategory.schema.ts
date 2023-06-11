import {Static, Type} from "@sinclair/typebox";
import {FastifySchema} from "fastify";
import {AlreadyExistsConflictSchema} from "./Global.schema";

const SubSubCategoryBodyCreateSchema = Type.Object({
    code: Type.String(),
    name: Type.String(),
    subCategoryCode: Type.String()
})

const SubSubCategoryBodyDeleteSchema = Type.String();

export type SubSubCategoryBodyCreateSchema = Static<typeof SubSubCategoryBodyCreateSchema>;
export type SubSubCategoryBodyDeleteSchema = Static<typeof SubSubCategoryBodyDeleteSchema>;

export const SubSubCategoryCreateSchema: FastifySchema = {
    tags: ["SubSubCategory"],
    summary: "create a subSubcategory",
    operationId: "createSubSubCategory",
    body: SubSubCategoryBodyCreateSchema,
    response: {
        200: SubSubCategoryBodyCreateSchema,
        409: AlreadyExistsConflictSchema
    }
}