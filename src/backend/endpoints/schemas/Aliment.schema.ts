import {Static, Type} from "@sinclair/typebox";
import {FastifySchema} from "fastify";
import {AlreadyExistsConflictSchema, DoesntExistsConflictSchema} from "./Global.schema";

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

const AlimentBodyDeleteSchema = Type.String();

export type AlimentBodyCreateSchema = Static<typeof AlimentBodyCreateSchema>;
export type AlimentBodyDeleteSchema = Static<typeof AlimentBodyDeleteSchema>;

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