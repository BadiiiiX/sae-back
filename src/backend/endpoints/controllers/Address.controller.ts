import {Controller, DELETE, GET, POST} from "fastify-decorators";
import {FastifyReply, FastifyRequest} from "fastify";
import AddressService from "../services/Address.service";
import {
    AddressBodyCreateSchema,
    AddressCreateSchema,
    AddressDeleteBodySchema,
    AddressDeleteSchema,
    AddressGetAllByParamsSchema,
    AddressGetAllSchema,
    AddressGetIdSchema,
    AddressParamsAllSchema,
    AddressParamsIdSchema
} from "../schemas/Address.schema";

@Controller({route: "/address"})
export default class addressController {

    constructor(
        private addressService: AddressService = new AddressService()
    ) {
    }

    @GET({
        url: "/:addressId", options: {
            schema: AddressGetIdSchema
        }
    })
    public async getAddressById(
        request: FastifyRequest<{ Params: AddressParamsIdSchema }>,
        reply: FastifyReply):
        Promise<void> {
        const response = await this.addressService.getAddress(request.params.addressId);
        return reply.code(200).send(response);
    }

    @GET({
        url: "/:addressStreet/:addressCity/:addressZip", options: {
            schema: AddressGetAllByParamsSchema
        }
    })
    public async getAddressByAllData(
        request: FastifyRequest<{ Params: AddressParamsAllSchema }>,
        reply: FastifyReply):
        Promise<void> {
        const response = await this.addressService.getAddressByAllData(request.params);
        return reply.code(200).send(response);
    }

    @GET({
        url: "/all", options: {
            schema: AddressGetAllSchema
        }
    })
    public async getAllAddresses(
        request: FastifyRequest,
        reply: FastifyReply):
        Promise<void> {
        const response = await this.addressService.getAllAddresses();
        return reply.code(200).send(response);
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

        const response = await this.addressService.deleteAddress(request.body.id);

        return reply.code(209).send();
    }
}