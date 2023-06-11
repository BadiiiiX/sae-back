import {Static, Type} from "@sinclair/typebox";
import {FastifySchema} from "fastify";
import CategorySchema from "../../schemas/Category.schema";
import {AlreadyExistsConflictSchema, DoesntExistsConflictSchema} from "./Global.schema";
import AlimentSchema from "../../schemas/Aliment.schema";

const AlimentBodyCreateSchema = Type.Object({
    code: Type.String(),
    name: Type.String(),
    categoryCode: Type.String(),
    subCategoryCode: Type.Optional(Type.String()),
    subSubCategoryCode: Type.Optional(Type.String())
});

const AlimentBodyDeleteSchema = Type.String();

const AlimentGetParamsSchema = Type.Object({
    alimentCode: Type.String()
});

export type AlimentBodyCreateSchema = Static<typeof AlimentBodyCreateSchema>;
export type AlimentBodyDeleteSchema = Static<typeof AlimentBodyDeleteSchema>;

export type AlimentGetParamsSchema = Static<typeof AlimentGetParamsSchema>;

export const AlimentCreateSchema: FastifySchema = {
    tags: ["Aliment"],
    summary: "create an aliment",
    operationId: "createAliment",
    body: AlimentBodyCreateSchema,
    response: {
        200: Type.Ref(AlimentSchema),
        409: AlreadyExistsConflictSchema
    }
}