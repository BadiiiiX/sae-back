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
    lastName: Type.String(),
    addressId: Type.Integer()
})

const UserDeleteBodySchema = Type.Integer();

export type UserCreateBodySchema = Static<typeof UserCreateBodySchema>
export type UserDeleteBodySchema = Static<typeof UserDeleteBodySchema>

export const UserCreateSchema: FastifySchema = {
    tags: ["User"],
    summary: "Create an user",
    operationId: "createUser",
    body: UserCreateBodySchema,
    response: {
        200: Type.Ref(UserSchema),
        409: AlreadyExistsConflictSchema
    }
}

export const UserDeleteSchema: FastifySchema = {
    tags: ["User"],
    summary: "Delete an user",
    operationId: "deleteUser",
    body: UserDeleteBodySchema,
    response: {
        200: Type.Boolean({default: true}),
        404: DoesntExistsConflictSchema
    }
}