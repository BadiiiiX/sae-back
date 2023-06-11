import {Type} from "@sinclair/typebox";

export const AlreadyExistsConflictSchema = {
    description: "The resource you are trying to create already exists",
    ...Type.Object({
        status: Type.Integer({default: 409}),
        error: Type.String(),
        message: Type.String()
    }, {$id: "AlreadyExistsConflictSchema"})
};

export const DoesntExistsConflictSchema = {
    description: "The resource you are trying to delete doesn't exist",
    ...Type.Object({
        status: Type.Integer({default: 404}),
        error: Type.String(),
        message: Type.String()
    }, {$id: "DoesntExistsConflictSchema"})
}
;
