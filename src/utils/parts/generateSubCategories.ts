import {AlimentLine} from "../setupData";
import axios from "axios";
import {capitalize} from "../capitalize";
import {printAxiosData} from "../AxiosResultManager";

type subCategoryLine = {
    code: string,
    name: string,
    categoryCode: string
}

export const generateSubCategories = async (aliments: AlimentLine[], log = false) => {

    const subCategories = new Set<string>();
    const subCategoryList: subCategoryLine[] = [];
    let subCategoryCount = 0;

    for (const aliment of aliments) {
        const actualAliment = aliment as AlimentLine;
        if (subCategories.has(actualAliment.alim_ssgrp_code)) continue;

        if(actualAliment.alim_ssgrp_code === "103")
            actualAliment.alim_ssgrp_code = "0103"

        subCategories.add(actualAliment.alim_ssgrp_code);
        subCategoryList.push({
            code: actualAliment.alim_ssgrp_code,
            name: capitalize(actualAliment.alim_ssgrp_nom_fr),
            categoryCode: actualAliment.alim_grp_code
        });
    }

    for (const subCategory of subCategoryList) {
        subCategoryCount++;
        await generate(subCategory, log);
    }

    console.log(`Generated ${subCategoryCount} subCategories`)
}

const generate = async (subCategory: subCategoryLine, log: boolean) => {
    const url = 'http://localhost:3000/subcategory/create';

    const {data} = await axios.post(url, subCategory);

    printAxiosData("SubCategory", data, log)
}