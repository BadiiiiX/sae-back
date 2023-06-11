import axios from "axios";
import {AlimentLine} from "../setupData";
import {capitalize} from "../capitalize";

type alimentContent = {
    "code": string,
    "name": string,
    "categoryCode": string,
    "subCategoryCode": string,
    "subSubCategoryCode": string
}

export const generateAliments = async (aliments: AlimentLine[]) => {

    for (const aliment of aliments) {

        const alimentData: alimentContent = {
            code: aliment.alim_code,
            name: capitalize(aliment.alim_nom_fr),
            categoryCode: aliment.alim_grp_code,
            subCategoryCode: aliment.alim_ssgrp_code,
            subSubCategoryCode: aliment.alim_ssssgrp_code
        }

        await axios.post('http://localhost:3000/aliment/create', alimentData)
    }
}