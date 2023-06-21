import {Controller, DELETE, GET, POST} from "fastify-decorators";
import SubCategoryService from "../services/SubCategory.service";
import {
    SubCategoryBodyCreateSchema, SubCategoryBodyDeleteSchema,
    SubCategoryCreateSchema, SubCategoryDeleteSchema, SubCategoryGetAllSchema,
    SubCategoryGetSchema, SubCategoryParamsGetSchema
} from "../schemas/SubCategory.schema";
import {FastifyReply, FastifyRequest} from "fastify";
import {SurveyRest} from "../../index";

@Controller({route: "/subcategory"})
export default class subCategoryController {

    constructor(
        private subCategoryService: SubCategoryService = new SubCategoryService()
    ) {
    }

    @GET({
        url: "/:subCategoryCode", options: {
            schema: SubCategoryGetSchema
        }
    })
    async getSubCategoryByCode(
        request: FastifyRequest<{ Params: SubCategoryParamsGetSchema }>,
        reply: FastifyReply):
        Promise<void> {
        const response = await this.subCategoryService.getSubCategory(request.params.subCategoryCode);
        return reply.code(200).send(response);
    }

    @GET({
        url: "/all", options: {
            schema: SubCategoryGetAllSchema
        }
    })
    async getAllSubCategories(
        request: FastifyRequest,
        reply: FastifyReply):
        Promise<void> {
        const response = await this.subCategoryService.getAllSubCategories();
        return reply.code(200).send(response);
    }

    @POST({
        url: "/create", options: {
            schema: SubCategoryCreateSchema
        }
    })
    public async createSubCategory(
        request: FastifyRequest<{ Body: SubCategoryBodyCreateSchema }>,
        reply: FastifyReply):
        Promise<void> {

        const subCategory = await this.subCategoryService.createSubCategory(request.body);

        SurveyRest.getInstance().getLogger().log(subCategory)

        return reply.code(200).send(subCategory);
    }

    @DELETE({
        url: "/delete", options: {
            schema: SubCategoryDeleteSchema
        }
    })
    async deleteSubCategory(
        request: FastifyRequest<{ Body: SubCategoryBodyDeleteSchema }>,
        reply: FastifyReply):
        Promise<void> {
        const response = await this.subCategoryService.deleteSubCategory(request.body.code);
        return reply.code(200).send(response);
    }

}