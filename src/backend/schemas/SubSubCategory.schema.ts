import {Type} from "@sinclair/typebox";

export default Type.Object({
    code: Type.String({
        default: "000000",
        description: "The code of the subSubCategory",
    }),
    name: Type.String({
        default: "Not defined",
        description: "The name of the subSubCategory",
    })
}, {
    $id: "SubSubCategory",
    description: "The schema describing a subSubCategory"
})