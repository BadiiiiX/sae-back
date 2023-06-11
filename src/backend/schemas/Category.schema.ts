import {Type} from "@sinclair/typebox";
import SubSubCategorySchema from "./SubSubCategory.schema";
import subCategorySchema from "./SubCategory.schema";

export default Type.Object({
    code: Type.String({
        description: "The code of the category",
    }),
    name: Type.String({
        description: "The name of the category",
    }),
    subCategories: Type.Optional(Type.Array(
        Type.Ref(subCategorySchema), {
            description: "The subCategories of the category",
        }
    )),

}, {
    $id: "Category",
    description: "The schema describing a category"
})