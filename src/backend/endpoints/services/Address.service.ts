import {Service} from "fastify-decorators";
import {AddressBodyCreateSchema, AddressDeleteBodySchema} from "../schemas/Address.schema";
import prisma from "../../../clients/Prisma";
import {Prisma, Address} from "@prisma/client";
import {ApiError} from "../Errors/ApiError";

@Service()
export default class AddressService {

    public static AddressPublicSelect: Prisma.AddressSelect = {
        id: true,
        street: true,
        city: true,
        zip: true,
    }

    public static async isAddressExist(id: number): Promise<boolean> {
        const address = await prisma.address.findFirst({
            where: {
                id
            }
        });

        return address !== null;
    }

    async createAddress(data: AddressBodyCreateSchema): Promise<Partial<Address>> {

        const address = await prisma.address.findFirst({
            where: {
                street: data.street,
                city: data.city,
                zip: data.zip
            }
        })

        if (address !== null) {
            throw new ApiError("Address already exists", 409);
        }

        return prisma.address.create({
            data: {
                street: data.street,
                city: data.city,
                zip: data.zip
            },

            select: AddressService.AddressPublicSelect
        });

    }

    async deleteAddress(data: AddressDeleteBodySchema): Promise<Partial<void>> {

        const id = data;

        const address = await prisma.address.findFirst({
            where: {
                id
            }
        });

        if (!address) {
            throw new ApiError("Address doesn't exist", 404);
        }

        await prisma.address.delete({
            where: {
                id
            }
        });
    }
}