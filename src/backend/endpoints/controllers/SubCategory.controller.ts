import {Controller, POST} from "fastify-decorators";
import SubCategoryService from "../services/SubCategory.service";
import {SubCategoryBodyCreateSchema, SubCategoryCreateSchema} from "../schemas/SubCategory.schema";
import {FastifyReply, FastifyRequest} from "fastify";

@Controller({route: "/subcategory"})
export default class subCategoryController {

    constructor(
        private subCategoryService: SubCategoryService = new SubCategoryService()
    ) {
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
        return reply.code(200).send(subCategory);
    }

}