import {Type} from "@sinclair/typebox";
import UserSchema from "./User.schema";
import AlimentSchema from "./Aliment.schema";

// @ts-ignore
export default Type.Object({

   id: Type.Integer({
         description: "The id of the survey",
   }),
    user: Type.Ref(UserSchema, {
        description: "The user of the survey",
    }),
    aliment: Type.Ref(AlimentSchema, {
        description: "The aliment of the survey",
    }),
    date: Type.Date({
        description: "The date of the survey",
    }),

}, {
    $id: "Survey",
    description: "The schema describing a survey"
});