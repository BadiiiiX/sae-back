import {Static, Type} from "@sinclair/typebox";
import {FastifySchema} from "fastify";
import {AlreadyExistsConflictSchema, DoesntExistsConflictSchema} from "./Global.schema";
import SurveySchema from "../../schemas/Survey.schema";

const SurveyCreateBodySchema = Type.Object({
    alimentCode: Type.String(),
    userId: Type.Integer(),
})

const SurveyDeleteBodySchema = Type.Integer();

export type SurveyCreateBodySchema = Static<typeof SurveyCreateBodySchema>
export type SurveyDeleteBodySchema = Static<typeof SurveyDeleteBodySchema>

export const SurveyCreateSchema: FastifySchema = {
    tags: ["Sondage"],
    summary: "Create a survey record",
    operationId: "createSurvey",
    body: SurveyCreateBodySchema,
    response: {
        200: Type.Ref(SurveySchema),
        409: AlreadyExistsConflictSchema
    }
}

export const SurveyDeleteSchema: FastifySchema = {
    tags: ["Sondage"],
    summary: "Delete a survey record",
    operationId: "deleteSurvey",
    body: SurveyDeleteBodySchema,
    response: {
        200: Type.Boolean({default: true}),
        404: DoesntExistsConflictSchema
    }
}