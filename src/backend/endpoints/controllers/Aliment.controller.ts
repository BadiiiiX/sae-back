import {Controller, DELETE, GET, POST} from "fastify-decorators";
import AlimentService from "../services/Aliment.service";
import {
    AlimentBodyCreateSchema, AlimentBodyDeleteSchema,
    AlimentCreateSchema, AlimentDeleteSchema, AlimentGetAllSchema, AlimentGetByAnyCategorySchema,
    AlimentGetSchema, AlimentParamsGetCategorySchema, AlimentParamsGetSchema
} from "../schemas/Aliment.schema";
import {FastifyReply, FastifyRequest} from "fastify";

@Controller({route: "/aliment"})
export default class alimentController {

    constructor(
        private alimentService: AlimentService = new AlimentService(),
    ) {
    }

    @GET({
        url: "/:alimentCode", options: {
            schema: AlimentGetSchema
        }
    })
    public async getAlimentByCode(
        request: FastifyRequest<{ Params: AlimentParamsGetSchema }>,
        reply: FastifyReply):
        Promise<void> {
        const res = await this.alimentService.getAlimentByCode(request.params.alimentCode);
        return reply.code(200).send(res);
    }

    @GET({
        url: "/search/:anyCategoryCode" , options: {
            schema: AlimentGetByAnyCategorySchema
        }
    })
    public async getAlimentsByAnyCategory(
        request: FastifyRequest<{ Params: AlimentParamsGetCategorySchema }>,
        reply: FastifyReply):
        Promise<void> {
        const res = await this.alimentService.getAlimentByCategory(request.params.anyCategoryCode);

        return reply.code(200).send(res);
    }

    @GET({
        url: "/all", options: {
            schema: AlimentGetAllSchema
        }
    })
    public async getAllAliments(
        request: FastifyRequest,
        reply: FastifyReply):
        Promise<void> {
        const res = await this.alimentService.getAllAliments();
        return reply.code(200).send(res);
    }

    @POST({
        url: "/create", options: {
            schema: AlimentCreateSchema
        }
    })
    public async createAliment(
        request: FastifyRequest<{ Body: AlimentBodyCreateSchema }>,
        reply: FastifyReply):
        Promise<void> {

        const res = await this.alimentService.createAliment(request.body);

        return reply.code(200).send(res);
    }

    @DELETE({
        url: "/delete", options: {
            schema: AlimentDeleteSchema
        }
    })
    public async deleteAliment(
        request: FastifyRequest<{ Body: AlimentBodyDeleteSchema }>,
        reply: FastifyReply):
        Promise<void> {
        const res = await this.alimentService.deleteAliment(request.body.code);
        return reply.code(200).send(res);
    }

}