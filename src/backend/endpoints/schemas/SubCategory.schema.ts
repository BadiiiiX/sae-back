import {Static, Type} from "@sinclair/typebox";
import {FastifySchema} from "fastify";
import {AlreadyExistsConflictSchema, DoesntExistsConflictSchema} from "./Global.schema";
import SubCategorySchema from "../../schemas/SubCategory.schema";

const SubCategoryBodyCreateSchema = Type.Object({
    code: Type.String(),
    name: Type.String(),
    categoryCode: Type.String()
})

const SubCategoryResponseCreateSchema = Type.Object({
    code: Type.String(),
    name: Type.String(),
    alimentCategoryCode: Type.String()
});

const SubCategoryBodyDeleteSchema = Type.Object({
    code: Type.String()
});

const SubCategoryParamsGetSchema = Type.Object({
    subCategoryCode: Type.String()
});

export type SubCategoryBodyCreateSchema = Static<typeof SubCategoryBodyCreateSchema>;
export type SubCategoryBodyDeleteSchema = Static<typeof SubCategoryBodyDeleteSchema>;
export type SubCategoryParamsGetSchema = Static<typeof SubCategoryParamsGetSchema>;

export const SubCategoryGetSchema: FastifySchema = {
    tags: ["SubCategory"],
    summary: "Get a subcategory",
    operationId: "getSubCategoryByCode",
    params: SubCategoryParamsGetSchema,
    response: {
        200: Type.Ref(SubCategorySchema),
        404: DoesntExistsConflictSchema
    }
}

export const SubCategoryGetAllSchema: FastifySchema = {
    tags: ["SubCategory"],
    summary: "Get all subcategories",
    operationId: "getAllSubCategories",
    response: {
        200: Type.Array(Type.Ref(SubCategorySchema))
    }
}

export const SubCategoryCreateSchema: FastifySchema = {
    tags: ["SubCategory"],
    summary: "create a subcategory",
    operationId: "createSubCategory",
    body: SubCategoryBodyCreateSchema,
    response: {
        200: SubCategoryResponseCreateSchema,
        409: AlreadyExistsConflictSchema,
        404: DoesntExistsConflictSchema,
    }
}

export const SubCategoryDeleteSchema: FastifySchema = {
    tags: ["SubCategory"],
    summary: "delete a subcategory",
    operationId: "deleteSubCategory",
    body: SubCategoryBodyDeleteSchema,
    response: {
        200: Type.Void(),
        409: AlreadyExistsConflictSchema,
        404: DoesntExistsConflictSchema,
    }
}