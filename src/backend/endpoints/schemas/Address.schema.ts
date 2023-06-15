import {Static, Type} from "@sinclair/typebox";
import {FastifySchema} from "fastify";
import AddressSchema from "../../schemas/Address.schema";
import {AlreadyExistsConflictSchema, DoesntExistsConflictSchema} from "./Global.schema";

const AddressBodyCreateSchema = Type.Object({
    street: Type.String(),
    city: Type.String(),
    zip: Type.String()
})

const AddressDeleteBodySchema = Type.Integer();

export type AddressBodyCreateSchema = Static<typeof AddressBodyCreateSchema>
export type AddressDeleteBodySchema = Static<typeof AddressDeleteBodySchema>

export const AddressCreateSchema: FastifySchema = {
    tags: ["Address"],
    summary: "Create or return an address",
    operationId: "createAddress",
    body: AddressBodyCreateSchema,
    response: {
        200: Type.Ref(AddressSchema),
        409: AlreadyExistsConflictSchema
    }
}

export const AddressDeleteSchema: FastifySchema = {
    tags: ["Address"],
    summary: "Delete an address",
    operationId: "deleteAddress",
    body: AddressDeleteBodySchema,
    response: {
        200: Type.Void(),
        409: AlreadyExistsConflictSchema,
        404: DoesntExistsConflictSchema
    }
}