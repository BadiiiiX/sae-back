import {AlimentLine} from "../setupData";
import axios from "axios";
import {capitalize} from "../capitalize";

type subSubCategoryLine = {
    code: string,
    name: string,
    subCategoryCode: string
}

export const generateSubSubCategories = async (aliments: AlimentLine[]) => {

    const subSubCategories = new Set<string>();
    const subSubCategoryList: subSubCategoryLine[] = [];

    for (const aliment of aliments) {
        const actualAliment = aliment as AlimentLine;
        if (actualAliment.alim_ssssgrp_code === null || actualAliment.alim_ssssgrp_code === "000000" || subSubCategories.has(actualAliment.alim_ssssgrp_code)) continue;
        subSubCategories.add(actualAliment.alim_ssssgrp_code);
        subSubCategoryList.push({
            code: actualAliment.alim_ssssgrp_code,
            name: capitalize(actualAliment.alim_ssssgrp_nom_fr),
            subCategoryCode: actualAliment.alim_ssgrp_code
        });
    }

    for (const subSubCategory of subSubCategoryList) {
        axios.post('http://localhost:3000/subsubcategory/create', subSubCategory)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error.data);
            });
    }
}