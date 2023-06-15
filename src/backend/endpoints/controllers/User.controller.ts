import {Controller, DELETE, GET, POST} from "fastify-decorators";
import UserService from "../services/User.service";
import {FastifyReply, FastifyRequest} from "fastify";
import {
    UserCreateBodySchema,
    UserCreateSchema,
    UserDeleteBodySchema,
    UserDeleteSchema, UserGetAllSchema, UserGetParamsSchema,
    UserGetSchema
} from "../schemas/User.schema";

@Controller({route: "/user"})
export default class userController {

    constructor(
        readonly userService: UserService = new UserService()
    ) {
    }

    @GET({
        url: "/:userEmail", options: {
            schema: UserGetSchema
        }
    })
    async getUserByEmail(
        request: FastifyRequest<{ Params: UserGetParamsSchema }>,
        reply: FastifyReply):
        Promise<void> {
        const response = await this.userService.getUserByMail(request.params.userEmail);

    }

    @GET({
        url: "/all", options: {
            schema: UserGetAllSchema
        }
    })
    async getAllUsers(
        request: FastifyRequest,
        reply: FastifyReply):
        Promise<void> {
        const response = await this.userService.getAllUsers();

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