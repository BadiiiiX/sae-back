import {Controller, DELETE, GET, POST} from "fastify-decorators";

import {FastifyReply, FastifyRequest} from "fastify";
import CategoryService from "../services/Category.service";
import {
    CategoryBodyCreateSchema,
    CategoryBodyDeleteSchema,
    CategoryCreateSchema, CategoryDeleteSchema, CategoryGetAllSchema, CategoryGetParamsSchema, CategoryGetSchema
} from "../schemas/Category.schema";

@Controller({route: "/category"})
export default class categoryController {
    constructor(
        private categoryService: CategoryService = new CategoryService()
    ) {
    }

    @GET({
        url: "/:categoryCode", options: {
            schema: CategoryGetSchema
        }
    })
    async getCategoryByCode(
        request: FastifyRequest<{ Params: CategoryGetParamsSchema }>,
        reply: FastifyReply):
        Promise<void> {
        const actualCode = request.params.categoryCode;

        const response = await this.categoryService.getCategory(actualCode);
        return reply.code(200).send(response);
    }

    @GET({
        url: "/all", options: {
            schema: CategoryGetAllSchema
        }
    })
    async getAllCategories(
        request: FastifyRequest,
        reply: FastifyReply):
        Promise<void> {
        const response = await this.categoryService.getAllCategories();

        return reply.code(200).send(response);
    }

    @POST({
        url: "/create", options: {
            schema: CategoryCreateSchema
        }
    })
    public async createCategory(
        request: FastifyRequest<{ Body: CategoryBodyCreateSchema }>,
        reply: FastifyReply):
        Promise<void> {

        const category = await this.categoryService.createCategory(request.body);

        return reply.code(200).send(category);
    }

    @DELETE({
        url: "/delete", options: {
            schema: CategoryDeleteSchema
        }
    })
    async deleteCategory(
        request: FastifyRequest<{ Body: CategoryBodyDeleteSchema }>,
        reply: FastifyReply):
        Promise<void> {

        const response = await this.categoryService.deleteCategory(request.body.code);

        return reply.code(200).send(response);
    }
}