import {Controller, DELETE, POST} from "fastify-decorators";
import {FastifyReply, FastifyRequest} from "fastify";
import AddressService from "../services/Address.service";
import {
    AddressBodyCreateSchema,
    AddressCreateSchema,
    AddressDeleteBodySchema,
    AddressDeleteSchema
} from "../schemas/Address.schema";

@Controller({route: "/address"})
export default class addressController {

    constructor(
        private addressService: AddressService = new AddressService()
    ) {
    }

    @POST({
        url: "/create", options: {
            schema: {
                ...AddressCreateSchema
            }
        }
    })
    public async createAddress(
        request: FastifyRequest<{ Body: AddressBodyCreateSchema }>,
        reply: FastifyReply):
        Promise<void> {

        const address = await this.addressService.createAddress(request.body);

        return reply.code(200).send(address);
    }

    @DELETE({
        url: "/delete", options: {
            schema: {
                ...AddressDeleteSchema
            }
        }
    })
    async deleteAddress(
        request: FastifyRequest<{ Body: AddressDeleteBodySchema }>,
        reply: FastifyReply):
        Promise<void> {

        const response = await this.addressService.deleteAddress(request.body);

        return reply.code(209).send();
    }
}