import {Controller, DELETE, GET, POST} from "fastify-decorators";
import SubSubCategoryService from "../services/SubSubCategory.service";
import {FastifyReply, FastifyRequest} from "fastify";
import {
    SubSubCategoryBodyCreateSchema, SubSubCategoryBodyDeleteSchema,
    SubSubCategoryCreateSchema, SubSubCategoryDeleteSchema, SubSubCategoryGetAllSchema, SubSubCategoryGetSchema,
    SubSubCategoryParamsGetSchema
} from "../schemas/SubSubCategory.schema";
import * as repl from "repl";

@Controller({route: "/subsubcategory"})
export default class subSubCategoryController {

    constructor(
        private subSubCategoryService: SubSubCategoryService = new SubSubCategoryService(),
    ) {
    }

    @GET({
        url: "/:subSubCategoryCode", options: {
            schema: SubSubCategoryGetSchema
        }
    })
    async getSubSubCategoryByCode(
        request: FastifyRequest<{ Params: SubSubCategoryParamsGetSchema }>,
        reply: FastifyReply):
        Promise<void> {
        const response = await this.subSubCategoryService.getSubSubCategory(request.params.subSubCategoryCode);
        return reply.code(200).send(response);
    }

    @GET({
        url: "/all", options: {
            schema: SubSubCategoryGetAllSchema
        }
    })
    async getAllSubSubCategories(
        request: FastifyRequest,
        reply: FastifyReply):
        Promise<void> {
        const response = await this.subSubCategoryService.getAllSubSubCategories();
        return reply.code(200).send(response);
    }

    @POST({
        url: "/create", options: {
            schema: SubSubCategoryCreateSchema
        }
    })
    public async createSubSubCategory(
        request: FastifyRequest<{ Body: SubSubCategoryBodyCreateSchema }>,
        reply: FastifyReply):
        Promise<void> {

        const subCategory = await this.subSubCategoryService.createSubSubCategory(request.body);
        return reply.code(200).send(subCategory);
    }

    @DELETE({
        url: "/delete", options: {
            schema: SubSubCategoryDeleteSchema
        }
    })
    public async deleteSubSubCategory(
        request: FastifyRequest<{ Body: SubSubCategoryBodyDeleteSchema }>,
        reply: FastifyReply):
        Promise<void> {
        return reply.code(200).send(await this.subSubCategoryService.deleteSubSubCategory(request.body.code));
    }
}