import {Static, Type} from "@sinclair/typebox";
import {FastifySchema} from "fastify";
import UserSchema from "../../schemas/User.schema";
import {AlreadyExistsConflictSchema, DoesntExistsConflictSchema} from "./Global.schema";

const UserCreateBodySchema = Type.Object({
    email: Type.String(),
    birthDate: Type.String({
        format: "date"
    }),
    firstName: Type.String(),
    lastName: Type.String()
})

const UserGetParamsSchema = Type.Object({
    userEmail: Type.String()
})

const UserDeleteBodySchema = Type.Integer();

export type UserCreateBodySchema = Static<typeof UserCreateBodySchema>
export type UserDeleteBodySchema = Static<typeof UserDeleteBodySchema>
export type UserGetParamsSchema = Static<typeof UserGetParamsSchema>

export const UserCreateSchema: FastifySchema = {
    tags: ["User"],
    summary: "Create an user",
    operationId: "createUser",
    body: UserCreateBodySchema,
    response: {
        200: Type.Ref(UserSchema),
        409: AlreadyExistsConflictSchema,
        404: DoesntExistsConflictSchema,
    }
}

export const UserDeleteSchema: FastifySchema = {
    tags: ["User"],
    summary: "Delete an user",
    operationId: "deleteUser",
    body: UserDeleteBodySchema,
    response: {
        200: Type.Void(),
        404: DoesntExistsConflictSchema
    }
}

export const UserGetSchema: FastifySchema = {
    tags: ["User"],
    summary: "Get an user",
    operationId: "getUserByEmail",
    params: UserGetParamsSchema,
    response: {
        200: Type.Ref(UserSchema),
        404: DoesntExistsConflictSchema
    }
}

export const UserGetAllSchema: FastifySchema = {
    tags: ["User"],
    summary: "Get all users",
    operationId: "getAllUsers",
    response: {
        200: Type.Array(Type.Ref(UserSchema))
    }
}