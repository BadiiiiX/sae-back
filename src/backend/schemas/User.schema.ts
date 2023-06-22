import {Type} from "@sinclair/typebox";
import AddressSchema from "./Address.schema";

export default Type.Object({

    id: Type.Integer({
        description: "The id of the user",
    }),
    birthdate: Type.String({format: "date", description: "The birthdate of the user"}),
    firstname: Type.String({
        description: "The firstname of the user",
    }),
    lastname: Type.String({
        description: "The lastname of the user",
    }),
    email: Type.String()

}, {
    $id: "User",
    description: "The schema describing a user"
})