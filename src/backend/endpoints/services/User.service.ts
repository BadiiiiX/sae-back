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
        email: true
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

        const mail = decodeURIComponent(data.email);


        const user = await prisma.user.findFirst({
            where: {
                email: mail
            }
        });

        if (user !== null) {
            throw new ApiError("User already exists with this mail", 409);
        }

        return prisma.user.create({
            data: {
                email: mail,
                firstname: data.firstName,
                lastname: data.lastName,
                birthdate: new Date(data.birthDate)
            },
            select: UserService.UserPublicSelect
        });

    }

    async getUserByMail(email: string): Promise<Partial<User>> {

        const mail = decodeURIComponent(email);

        const user = await prisma.user.findFirst({
            where: {
                email: mail
            },
            select: UserService.UserPublicSelect
        });

        if (user === null) {
            throw new ApiError("User not found", 404);
        }

        return user;
    }

    async getAllUsers(): Promise<Partial<User>[]> {
        return prisma.user.findMany({
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