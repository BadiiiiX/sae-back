import {Static, Type} from "@sinclair/typebox";
import {FastifySchema} from "fastify";
import {AlreadyExistsConflictSchema, DoesntExistsConflictSchema} from "./Global.schema";
import SurveySchema from "../../schemas/Survey.schema";

const SurveyCreateBodySchema = Type.Object({
    alimentCode: Type.String(),
    userId: Type.Integer(),
})

const SurveyGetParamsByIdSchema = Type.Object({
    surveyId: Type.Integer()
});

const SurveyGetParamsByAlimentSchema = Type.Object({
    alimentCode: Type.String()
});

const SurveyGetParamsByUserSchema = Type.Object({
    userId: Type.Integer()
});

const SurveyGetReturnSchema = Type.Object({

    id: Type.Number(),
    aliment: Type.Object({
        code: Type.String(),
        name: Type.String(),
        alimentCategoryCode: Type.String(),
        alimentSubCategoryCode: Type.String(),
        alimentSubSubCategoryCode: Type.String()
    }),
    user: Type.Object({
        id: Type.Number(),
        email: Type.String(),
        birthdate: Type.String({
            format: "date"
        }),
        firstname: Type.String(),
        lastname: Type.String(),
    }),
    date: Type.String({
        format: "date"
    }),


})

const SurveyDeleteBodySchema = Type.Integer();

export type SurveyCreateBodySchema = Static<typeof SurveyCreateBodySchema>
export type SurveyDeleteBodySchema = Static<typeof SurveyDeleteBodySchema>
export type SurveyGetParamsByIdSchema = Static<typeof SurveyGetParamsByIdSchema>
export type SurveyGetParamsByAlimentSchema = Static<typeof SurveyGetParamsByAlimentSchema>
export type SurveyGetParamsByUserSchema = Static<typeof SurveyGetParamsByUserSchema>


export const SurveyCreateSchema: FastifySchema = {
    tags: ["Survey"],
    summary: "Create a survey record",
    operationId: "createSurvey",
    body: SurveyCreateBodySchema,
    response: {
        200: SurveyGetReturnSchema,
        409: AlreadyExistsConflictSchema
    }
}

export const SurveyGetSchema: FastifySchema = {
    tags: ["Survey"],
    summary: "Get a survey record",
    operationId: "getSurvey",
    params: SurveyGetParamsByIdSchema,
    response: {
        200: Type.Ref(SurveySchema),
        404: DoesntExistsConflictSchema
    }
}

export const SurveyGetByAlimentSchema: FastifySchema = {
    tags: ["Survey"],
    summary: "Get a survey record by aliment",
    operationId: "getSurveyByAliment",
    params: SurveyGetParamsByAlimentSchema,
    response: {
        200: Type.Array(Type.Ref(SurveySchema)),
        404: DoesntExistsConflictSchema
    }
}

export const SurveyGetByUserSchema: FastifySchema = {
    tags: ["Survey"],
    summary: "Get a survey record by user",
    operationId: "getSurveyByUser",
    params: SurveyGetParamsByUserSchema,
    response: {
        200: Type.Array(Type.Ref(SurveySchema)),
        404: DoesntExistsConflictSchema
    }
}

export const SurveyGetAllSchema: FastifySchema = {
    tags: ["Survey"],
    summary: "Get all survey records",
    operationId: "getAllSurvey",
    response: {
        200: Type.Array(Type.Ref(SurveySchema)),
    }
}

export const SurveyDeleteSchema: FastifySchema = {
    tags: ["Survey"],
    summary: "Delete a survey record",
    operationId: "deleteSurvey",
    body: SurveyDeleteBodySchema,
    response: {
        200: Type.Void(),
        404: DoesntExistsConflictSchema
    }
}