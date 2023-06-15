//@ts-nocheck
import {Controller, POST} from "fastify-decorators";
import AlimentService from "../services/Aliment.service";
import {AlimentBodyCreateSchema, AlimentCreateSchema} from "../schemas/Aliment.schema";
import {FastifyReply, FastifyRequest} from "fastify";
import {SurveyRest} from "../../index";

@Controller({route: "/aliment"})
export default class alimentController {

    constructor(
        private alimentService: AlimentService = new AlimentService(),
    ) {
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


        if(res.subSubCategory === null) {
            const subCategoryCode =  res.subCategory.code;
            res.subSubCategory = {
                "code": "000000",
                "name": "Aucune sous sous catégorie",
                "alimentSubCategoryCode": subCategoryCode
            }
        }

        SurveyRest.getInstance().getLogger().info("Aliment created : " + JSON.stringify(res));

        return reply.code(200).send(res);
    }

}