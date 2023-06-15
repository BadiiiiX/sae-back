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

    public static async isUserExist(id: number): Promise<boolean> {
        const user = await prisma.user.findFirst({
            where: {
                id
            }
        });

        return user !== null;
    }

    async createUser(data: UserCreateBodySchema): Promise<Partial<User>> {

        if (await AddressService.isAddressExist(data.addressId)) {
            throw new ApiError("Address not found", 404)
        }

        const user = await prisma.user.findFirst({
            where: {
                email: data.email
            }
        });

        if (user !== null) {
            throw new ApiError("User already exists with this mail", 409);
        }

        return prisma.user.create({
            data: {
                email: data.email,
                firstname: data.firstName,
                lastname: data.lastName,
                birthdate: new Date(data.birthDate),
                addressId: data.addressId,
            },
            select: UserService.UserPublicSelect
        });

    }

    async deleteUser(id: UserDeleteBodySchema): Promise<Partial<void>> {

        if (await UserService.isUserExist(id)) {
            throw new ApiError("User already exists", 409);
        }

        await prisma.user.delete({
            where: {
                id
            }
        });
    }
}