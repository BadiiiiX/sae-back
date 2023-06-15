import {Service} from "fastify-decorators";
import {Prisma, User} from "@prisma/client";
import prisma from "../../../clients/Prisma";
import {ApiError} from "../Errors/ApiError";
import {SurveyCreateBodySchema, SurveyDeleteBodySchema} from "../schemas/Survey.schema";
import UserService from "./User.service";
import AlimentService from "./Aliment.service";

@Service()
export default class SurveyService {

    public static SurveyPublicSelect: Prisma.SurveySelect = {
        id: true,
        aliment: true,
        user: true,
        date: true,
    }

    public static async isSurveyExist(id: number): Promise<boolean> {
        const survey = await prisma.survey.findFirst({
            where: {
                id
            }
        });

        return survey !== null;
    }

    async createSurvey(data: SurveyCreateBodySchema): Promise<Partial<User>> {

        if (!await UserService.isUserExist(data.userId)) {
            throw new ApiError("User doesn't exist", 404);
        }

        if (!await AlimentService.isAlimentExist(data.alimentCode)) {
            throw new ApiError("Aliment doesn't exist", 404);
        }

        const survey = await prisma.survey.findFirst({
            where: {
                alimentCode: data.alimentCode,
                userId: data.userId,
            }
        });

        if (survey !== null) {
            throw new ApiError("Survey already exists", 409);
        }

        return prisma.survey.create({
            data: {
                alimentCode: data.alimentCode,
                userId: data.userId,
                date: new Date(),
            },
            select: SurveyService.SurveyPublicSelect
        });

    }

    async getSurvey(id: SurveyDeleteBodySchema): Promise<Partial<User>> {

        if (!await SurveyService.isSurveyExist(id)) {
            throw new ApiError("Survey doesn't exist", 404);
        }

        return prisma.survey.findFirst({
            where: {
                id
            },
            select: SurveyService.SurveyPublicSelect
        });
    }

    async getSurveyByAlimentCode(alimentCode: string): Promise<Partial<User>> {

        if (!await AlimentService.isAlimentExist(alimentCode)) {
            throw new ApiError("Aliment doesn't exist", 404);
        }

        return prisma.survey.findFirst({
            where: {
                alimentCode
            },
            select: SurveyService.SurveyPublicSelect
        });
    }

    async getSurveyByUserId(userId: number): Promise<Partial<User>> {

        if (!await UserService.isUserExist(userId)) {
            throw new ApiError("User doesn't exist", 404);
        }

        return prisma.survey.findFirst({
            where: {
                userId
            },
            select: SurveyService.SurveyPublicSelect
        });
    }

    async getSurveys(): Promise<Partial<User>[]> {
        return prisma.survey.findMany({
            select: SurveyService.SurveyPublicSelect
        });
    }

    async deleteSurvey(id: SurveyDeleteBodySchema): Promise<Partial<void>> {

        if (await SurveyService.isSurveyExist(id)) {
            throw new ApiError("Survey doesn't exist", 404);
        }

        await prisma.user.delete({
            where: {
                id
            }
        });
    }

}