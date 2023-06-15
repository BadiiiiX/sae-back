import {Type} from "@sinclair/typebox";
import SubSubCategoryService from "../endpoints/services/SubSubCategory.service";

export default Type.Object({
    code: Type.String({
        default: SubSubCategoryService.NULL_CODE_VALUE,
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