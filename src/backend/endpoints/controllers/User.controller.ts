import {Controller, DELETE, POST} from "fastify-decorators";
import UserService from "../services/User.service";
import {FastifyReply, FastifyRequest} from "fastify";
import {UserCreateBodySchema, UserCreateSchema, UserDeleteBodySchema, UserDeleteSchema} from "../schemas/User.schema";
import {User} from "@prisma/client";

@Controller({route: "/user"})
export default class userController {

    constructor(
        readonly userService: UserService = new UserService()
    ) {
    }

    @POST({
        url: "/create", options: {
            schema: {
                ...UserCreateSchema
            }
        }
    })
    async createUser(
        request: FastifyRequest<{ Body: UserCreateBodySchema }>,
        reply: FastifyReply):
        Promise<void> {

        const user = await this.userService.createUser(request.body);

        return reply.code(200).send(user);
    }

    @DELETE({
        url: "/delete", options: {
            schema: {
                ...UserDeleteSchema
            }
        }
    })
    async deleteUser(
        request: FastifyRequest<{ Body: UserDeleteBodySchema }>,
        reply: FastifyReply):
        Promise<void> {

        const response = await this.userService.deleteUser(request.body);

        return reply.code(200).send(response);
    }
}