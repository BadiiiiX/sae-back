import {Type} from "@sinclair/typebox";
import UserSchema from "./User.schema";
import AlimentSchema from "./Aliment.schema";

// @ts-ignore
export default Type.Object({

   id: Type.Integer({
         description: "The id of the sondage",
   }),
    user: Type.Ref(UserSchema, {
        description: "The user of the sondage",
    }),
    aliment: Type.Ref(AlimentSchema, {
        description: "The aliment of the sondage",
    }),
    date: Type.Date({
        description: "The date of the sondage",
    }),

}, {
    $id: "Sondage",
    description: "The schema describing a sondage"
});