import axios from "axios";
import {AlimentLine} from "../setupData";
import {capitalize} from "../capitalize";
import {printAxiosData} from "../AxiosResultManager";

type alimentContent = {
    "code": string,
    "name": string,
    "categoryCode": string,
    "subCategoryCode": string,
    "subSubCategoryCode": string
}

export const generateAliments = async (aliments: AlimentLine[], log = false) => {

    let alimentCount = 0;

    for (const aliment of aliments) {

        const alimentData: alimentContent = {
            code: aliment.alim_code,
            name: capitalize(aliment.alim_nom_fr),
            categoryCode: aliment.alim_grp_code,
            subCategoryCode: aliment.alim_ssgrp_code,
            subSubCategoryCode: aliment.alim_ssssgrp_code
        }

        alimentCount++;
        await generate(alimentData, log);
    }

    console.log(`Generated ${alimentCount} aliments`)
}

const generate = async (aliment: alimentContent, log: boolean) => {
    const url = 'http://localhost:3000/aliment/create';

    const {data} = await axios.post(url, aliment);

    printAxiosData("Aliment", data, log)
}