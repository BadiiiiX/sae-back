import {Service} from "fastify-decorators";
import {AddressBodyCreateSchema, AddressParamsAllSchema} from "../schemas/Address.schema";
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

    getAddressByAllData(data: AddressParamsAllSchema): Promise<Address> {

        const address = prisma.address.findUnique({
            where: {
                street_city_zip: {
                    street: data.addressStreet,
                    city: data.addressCity,
                    zip: data.addressZip
                }
            }
        });

        if (address === null) {
            throw new ApiError("Address not found", 404);
        }

        return address;
    }

    async getAddress(id: number): Promise<Partial<Address>> {
        const address = await prisma.address.findUnique({
            where: {
                id
            },
            select: AddressService.AddressPublicSelect
        });

        if (address === null) {
            throw new ApiError("Address not found", 404);
        }

        return address;
    }

    async getAllAddresses(): Promise<Partial<Address>[]> {
        return prisma.address.findMany({
            select: AddressService.AddressPublicSelect
        });
    }

    async deleteAddress(id: number): Promise<Partial<void>> {

        if (!await AddressService.isAddressExist(id)) {
            throw new ApiError("Address doesn't exist", 404);
        }

        await prisma.address.delete({
            where: {
                id
            }
        });
    }
}