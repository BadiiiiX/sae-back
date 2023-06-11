import {Type} from "@sinclair/typebox";
import CategorySchema from "./Category.schema";
import SubCategorySchema from "./SubCategory.schema";
import SubSubCategorySchema from "./SubSubCategory.schema";

export default Type.Object({
    code: Type.String({
        description: "The code of the aliment",
    }),
    name: Type.String({
        description: "The name of the aliment",
    }),
    category: Type.Ref(CategorySchema),
    subCategory: Type.Optional(Type.Ref(SubCategorySchema)),
    subSubCategory: Type.Optional(Type.Ref(SubSubCategorySchema)),
}, {
    $id: "Aliment",
    description: "The schema describing an aliment"
});