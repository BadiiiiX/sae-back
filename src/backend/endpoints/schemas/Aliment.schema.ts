import {Static, Type} from "@sinclair/typebox";
import {FastifySchema} from "fastify";
import {AlreadyExistsConflictSchema, DoesntExistsConflictSchema} from "./Global.schema";
import AlimentSchema from "../../schemas/Aliment.schema";

const AlimentBodyCreateSchema = Type.Object({
    code: Type.String(),
    name: Type.String(),
    categoryCode: Type.String(),
    subCategoryCode: Type.Optional(Type.String()),
    subSubCategoryCode: Type.Optional(Type.String()),
});

const AlimentResponseCreateSchema = Type.Object({
    code: Type.String(),
    name: Type.String(),
    alimentCategoryCode: Type.String(),
    alimentSubCategoryCode: Type.String(),
    alimentSubSubCategoryCode: Type.Optional(Type.String())
})

const AlimentParamsGetSchema = Type.Object({
    alimentCode: Type.String()
});

const AlimentParamsGetCategorySchema = Type.Object({
    anyCategoryCode: Type.String()
});

const AlimentParamsGetByTokenSchema = Type.Object({
    token: Type.String()
});

const AlimentReturnsGetCategorySchema = Type.Object({
    code: Type.String(),
    name: Type.String(),
});

const AlimentReturnsGetPaginationCategorySchema = Type.Object({
    aliments: Type.Array(AlimentReturnsGetCategorySchema),
    nextPage: Type.Boolean()
})

const AlimentBodyDeleteSchema = Type.Object({
    code: Type.String()
});

const AlimentBodyGetByPaginationSchema = Type.Object({
    code: Type.String(),
    page: Type.Number()
})

export type AlimentBodyCreateSchema = Static<typeof AlimentBodyCreateSchema>;
export type AlimentBodyDeleteSchema = Static<typeof AlimentBodyDeleteSchema>;
export type AlimentParamsGetSchema = Static<typeof AlimentParamsGetSchema>;
export type AlimentParamsGetCategorySchema = Static<typeof AlimentParamsGetCategorySchema>;
export type AlimentParamsGetByTokenSchema = Static<typeof AlimentParamsGetByTokenSchema>;
export type AlimentBodyGetByPaginationSchema = Static<typeof AlimentBodyGetByPaginationSchema>;

export const AlimentCreateSchema: FastifySchema = {
    tags: ["Aliment"],
    summary: "create an aliment",
    operationId: "createAliment",
    body: AlimentBodyCreateSchema,
    response: {
        200: AlimentResponseCreateSchema,
        409: AlreadyExistsConflictSchema,
        404: DoesntExistsConflictSchema
    }
}

export const AlimentGetSchema: FastifySchema = {
    tags: ["Aliment"],
    summary: "get an aliment",
    operationId: "getAliment",
    params: AlimentParamsGetSchema,
    response: {
        200: Type.Ref(AlimentSchema),
        404: DoesntExistsConflictSchema
    }
}

export const AlimentGetAllSchema: FastifySchema = {
    tags: ["Aliment"],
    summary: "get all aliments",
    operationId: "getAllAliments",
    response: {
        200: Type.Array(Type.Ref(AlimentSchema))
    }
}

export const AlimentDeleteSchema: FastifySchema = {
    tags: ["Aliment"],
    summary: "delete an aliment",
    operationId: "deleteAliment",
    body: AlimentBodyDeleteSchema,
    response: {
        200: Type.Void(),
        404: DoesntExistsConflictSchema
    }
}

export const AlimentGetByAnyCategorySchema: FastifySchema = {
    tags: ["Aliment"],
    summary: "get aliments by any category",
    operationId: "getAlimentsByAnyCategory",
    params: AlimentParamsGetCategorySchema,
    response: {
        200: Type.Array(AlimentReturnsGetCategorySchema),
        404: DoesntExistsConflictSchema
    }
}

export const AlimentGetByTokenSchema: FastifySchema = {
    tags: ["Aliment"],
    summary: "get aliments by string",
    operationId: "getAlimentsByToken",
    params: AlimentParamsGetByTokenSchema,
    response: {
        200: Type.Array(AlimentReturnsGetCategorySchema)
    }
}

export const AlimentGetByPaginationSchema: FastifySchema = {
    tags: ["Aliment"],
    summary: "get aliments by category, with pagination",
    operationId: "getPaginationAliment",
    body: AlimentBodyGetByPaginationSchema,
    response: {
        200: AlimentReturnsGetPaginationCategorySchema,
        404: DoesntExistsConflictSchema
    }
}