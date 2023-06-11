import {AlimentLine} from "../setupData";
import axios from "axios";
import {capitalize} from "../capitalize";

type subCategoryLine = {
    code: string,
    name: string,
    categoryCode: string
}

export const generateSubCategories = async (aliments: AlimentLine[]) => {

    const subCategories = new Set<string>();
    const subCategoryList: subCategoryLine[] = [];

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
        const res = await axios.post('http://localhost:3000/subcategory/create', subCategory)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error.data);
            });
    }
}