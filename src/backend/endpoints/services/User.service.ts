import {Service} from "fastify-decorators";
import {Prisma, User} from "@prisma/client";
import prisma from "../../../clients/Prisma";
import {UserCreateBodySchema, UserDeleteBodySchema} from "../schemas/User.schema";
import {ApiError} from "../Errors/ApiError";
import AddressService from "./Address.service";

@Service()
export default class UserService {

    public static UserPublicSelect: Prisma.UserSelect = {
        id: true,
        firstname: true,
        lastname: true,
        birthdate: true,
        email: true,
        address: {
            select: AddressService.AddressPublicSelect
        }
    }

    async createUser(data: UserCreateBodySchema): Promise<Partial<User>> {

        const address = await prisma.address.findFirst({
            where: {
                id: data.addressId
            }
        });

        if (address == null) {
            throw new ApiError("Address not found", 500)
        }

        return prisma.user.create({
            data: {
                email: data.email,
                firstname: data.firstName,
                lastname: data.lastName,
                birthdate: new Date(data.birthDate),
                address: {
                    connect: {
                        id: data.addressId
                    }
                }
            },
            select: UserService.UserPublicSelect
        });

    }

    async deleteUser(data: UserDeleteBodySchema): Promise<Partial<void>> {

        const id = data;

        const user = await prisma.user.findFirst({
            where: {
                id
            }
        });

        if (!user) {
            throw new ApiError("User doesn't exist", 404);
        }

        await prisma.user.delete({
            where: {
                id
            }
        });
    }
}