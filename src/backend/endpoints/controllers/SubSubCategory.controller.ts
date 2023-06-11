import {Controller, POST} from "fastify-decorators";
import SubSubCategoryService from "../services/SubSubCategory.service";
import {FastifyReply, FastifyRequest} from "fastify";
import {SubSubCategoryBodyCreateSchema, SubSubCategoryCreateSchema} from "../schemas/SubSubCategory.schema";

@Controller({route: "/subsubcategory"})
export default class subSubCategoryController {

    constructor(
        private subSubCategoryService: SubSubCategoryService = new SubSubCategoryService(),
    ) {
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

}