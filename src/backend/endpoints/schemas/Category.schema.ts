import {Static, Type} from "@sinclair/typebox";
import {FastifySchema} from "fastify";
import CategorySchema from "../../schemas/Category.schema";
import {AlreadyExistsConflictSchema, DoesntExistsConflictSchema} from "./Global.schema";

const CategoryBodyCreateSchema = Type.Object({
    code: Type.String(),
    name: Type.String(),
});

const CategoryBodyDeleteSchema = Type.Object({
    code: Type.String()
});

const CategoryGetParamsSchema = Type.Object({
    categoryCode: Type.String()
});

export type CategoryBodyCreateSchema = Static<typeof CategoryBodyCreateSchema>;
export type CategoryBodyDeleteSchema = Static<typeof CategoryBodyDeleteSchema>;

export type CategoryGetParamsSchema = Static<typeof CategoryGetParamsSchema>;

export const CategoryCreateSchema: FastifySchema = {
    tags: ["Category"],
    summary: "create a category",
    operationId: "createCategory",
    body: CategoryBodyCreateSchema,
    response: {
        200: Type.Ref(CategorySchema),
        409: AlreadyExistsConflictSchema,
        404: DoesntExistsConflictSchema
    }
}

export const CategoryDeleteSchema: FastifySchema = {
    tags: ["Category"],
    summary: "Delete a category",
    operationId: "deleteCategory",
    body: CategoryBodyDeleteSchema,
    response: {
        209: Type.Void(),
        404: DoesntExistsConflictSchema
    }
}

export const CategoryGetSchema: FastifySchema = {
    tags: ["Category"],
    summary: "Get a category",
    operationId: "getCategoryByCode",
    params: CategoryGetParamsSchema,
    response: {
        200: Type.Ref(CategorySchema),
        404: DoesntExistsConflictSchema
    }
}

export const CategoryGetAllSchema: FastifySchema = {
    tags: ["Category"],
    summary: "Get all categories",
    operationId: "getAllCategories",
    response: {
        200: Type.Array(Type.Ref(CategorySchema))
    }
}