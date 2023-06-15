import {Static, Type} from "@sinclair/typebox";
import {FastifySchema} from "fastify";
import {AlreadyExistsConflictSchema, DoesntExistsConflictSchema} from "./Global.schema";
import SubSubCategorySchema from "../../schemas/SubSubCategory.schema";

const SubSubCategoryBodyCreateSchema = Type.Object({
    code: Type.String(),
    name: Type.String(),
    subCategoryCode: Type.String()
})

const SubSubCategoryResponseCreateSchema = Type.Object({
    code: Type.String(),
    name: Type.String(),
    alimentSubCategoryCode: Type.String()
});

const SubSubCategoryParamsGetSchema = Type.Object({
    subSubCategoryCode: Type.String()
});

const SubSubCategoryBodyDeleteSchema = Type.Object({
    code: Type.String()
});

export type SubSubCategoryBodyCreateSchema = Static<typeof SubSubCategoryBodyCreateSchema>;
export type SubSubCategoryBodyDeleteSchema = Static<typeof SubSubCategoryBodyDeleteSchema>;
export type SubSubCategoryParamsGetSchema = Static<typeof SubSubCategoryParamsGetSchema>;

export const SubSubCategoryGetSchema: FastifySchema = {
    tags: ["SubSubCategory"],
    summary: "Get a subSubcategory",
    operationId: "getSubSubCategoryByCode",
    params: SubSubCategoryParamsGetSchema,
    response: {
        200: Type.Ref(SubSubCategorySchema),
        404: DoesntExistsConflictSchema
    }
}

export const SubSubCategoryGetAllSchema: FastifySchema = {
    tags: ["SubSubCategory"],
    summary: "Get all subSubcategories",
    operationId: "getAllSubSubCategories",
    response: {
        200: Type.Array(Type.Ref(SubSubCategorySchema))
    }
}

export const SubSubCategoryCreateSchema: FastifySchema = {
    tags: ["SubSubCategory"],
    summary: "create a subSubcategory",
    operationId: "createSubSubCategory",
    body: SubSubCategoryBodyCreateSchema,
    response: {
        200: SubSubCategoryResponseCreateSchema,
        409: AlreadyExistsConflictSchema,
        404: DoesntExistsConflictSchema,
    }
}

export const SubSubCategoryDeleteSchema: FastifySchema = {
    tags: ["SubSubCategory"],
    summary: "delete a subSubcategory",
    operationId: "deleteSubSubCategory",
    body: SubSubCategoryBodyDeleteSchema,
    response: {
        200: Type.Void(),
        404: DoesntExistsConflictSchema,
    }
}