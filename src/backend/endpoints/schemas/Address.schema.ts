import {Static, Type} from "@sinclair/typebox";
import {FastifySchema} from "fastify";
import AddressSchema from "../../schemas/Address.schema";
import {AlreadyExistsConflictSchema, DoesntExistsConflictSchema} from "./Global.schema";

const AddressBodyCreateSchema = Type.Object({
    street: Type.String(),
    city: Type.String(),
    zip: Type.String()
})

const AddressParamsIdSchema = Type.Object({
    addressId: Type.Integer()
})

const AddressParamsAllSchema = Type.Object({
    addressStreet: Type.String(),
    addressCity: Type.String(),
    addressZip: Type.String()
})

const AddressDeleteBodySchema = Type.Object({
    id: Type.Integer()
});

export type AddressBodyCreateSchema = Static<typeof AddressBodyCreateSchema>
export type AddressDeleteBodySchema = Static<typeof AddressDeleteBodySchema>
export type AddressParamsIdSchema = Static<typeof AddressParamsIdSchema>
export type AddressParamsAllSchema = Static<typeof AddressParamsAllSchema>

export const AddressGetAllSchema: FastifySchema = {
    tags: ["Address"],
    summary: "Get all addresses",
    operationId: "getAllAddresses",
    response: {
        200: Type.Array(Type.Ref(AddressSchema))
    }
}

export const AddressGetIdSchema: FastifySchema = {
    tags: ["Address"],
    summary: "Get an address by id",
    operationId: "getAddressById",
    params: AddressParamsIdSchema,
    response: {
        200: Type.Ref(AddressSchema),
        404: DoesntExistsConflictSchema
    }
}

export const AddressGetAllByParamsSchema: FastifySchema = {
    tags: ["Address"],
    summary: "Get an address by params",
    operationId: "getAddressByParams",
    params: AddressParamsAllSchema,
    response: {
        200: Type.Array(Type.Ref(AddressSchema)),
        404: DoesntExistsConflictSchema
    }
}

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