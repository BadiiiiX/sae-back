import {Type} from "@sinclair/typebox";

export default Type.Object({

   id: Type.Integer({
         description: "The id of the address",
   }),
    street: Type.String({
        description: "The street of the address",
    }),
    city: Type.String({
        description: "The city of the address",
    }),
    zip: Type.String({
        description: "The zip of the address",
    })
}, {
    $id: "Address",
    description: "The schema describing an address"
});
