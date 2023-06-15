import {Controller, DELETE, GET, POST} from "fastify-decorators";
import SurveyService from "../services/Survey.service";
import {FastifyReply, FastifyRequest} from "fastify";
import {
    SurveyCreateBodySchema,
    SurveyCreateSchema, SurveyDeleteBodySchema, SurveyDeleteSchema,
    SurveyGetAllSchema,
    SurveyGetByAlimentSchema,
    SurveyGetByUserSchema,
    SurveyGetParamsByAlimentSchema, SurveyGetParamsByIdSchema, SurveyGetParamsByUserSchema, SurveyGetSchema
} from "../schemas/Survey.schema";

@Controller({route: "/survey"})
export default class surveyController {

    constructor(
        private surveyService: SurveyService = new SurveyService()
    ) {
    }

    @GET({
        url: "/:surveyId", options: {
            schema: SurveyGetSchema
        }
    })
    public async getSurvey(
        request: FastifyRequest<{ Params: SurveyGetParamsByIdSchema }>,
        reply: FastifyReply)
        : Promise<void> {
        const res = await this.surveyService.getSurvey(request.params.surveyId);
        return reply.code(200).send(res);
    }

    @GET({
        url: "/aliment/:alimentCode", options: {
            schema: SurveyGetByAlimentSchema
        }
    })
    public async getSurveyByAliment(
        request: FastifyRequest<{ Params: SurveyGetParamsByAlimentSchema }>,
        reply: FastifyReply):
        Promise<void> {
        const res = await this.surveyService.getSurveyByAlimentCode(request.params.alimentCode);
        return reply.code(200).send(res);
    }

    @GET({
        url: "/user/:userId", options: {
            schema: SurveyGetByUserSchema
        }
    })
    public async getSurveyByUser(
        request: FastifyRequest<{ Params: SurveyGetParamsByUserSchema }>,
        reply: FastifyReply):
        Promise<void> {
        const res = await this.surveyService.getSurveyByUserId(request.params.userId);
        return reply.code(200).send(res);
    }

    @GET({
        url: "/all", options: {
            schema: SurveyGetAllSchema
        }
    })
    public async getAllSurveys(
        request: FastifyRequest,
        reply: FastifyReply):
        Promise<void> {
        const res = await this.surveyService.getSurveys();
        return reply.code(200).send(res);
    }

    @POST({
        url: "/create", options: {
            schema: SurveyCreateSchema
        }
    })
    public async createSurvey(
        request: FastifyRequest<{ Body: SurveyCreateBodySchema }>,
        reply: FastifyReply):
        Promise<void> {
        const res = await this.surveyService.createSurvey(request.body);
        return reply.code(200).send(res);
    }

    @DELETE({
        url: "/delete", options: {
            schema: SurveyDeleteSchema
        }
    })
    public async deleteSurvey(
        request: FastifyRequest<{ Body: SurveyDeleteBodySchema }>,
        reply: FastifyReply):
        Promise<void> {
        const res = await this.surveyService.deleteSurvey(request.body);
        return reply.code(200).send(res);
    }
}