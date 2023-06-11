import {Type} from "@sinclair/typebox";
import SubSubCategorySchema from "./SubSubCategory.schema";

export default Type.Object({
    code: Type.String({
        description: "The code of the subCategory",
    }),
    name: Type.String({
        description: "The name of the subCategory",
    }),
    subSubCategories: Type.Optional(Type.Array(
        Type.Ref(SubSubCategorySchema), {
            description: "The subSubCategories of the subCategory",
        }
    )),
}, {
    $id: "SubCategory",
    description: "The schema describing a subCategory"
})