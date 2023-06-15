import {AlimentLine} from "../setupData";
import axios from "axios";
import {capitalize} from "../capitalize";
import SubSubCategoryService from "../../backend/endpoints/services/SubSubCategory.service";
import {printAxiosData} from "../AxiosResultManager";

type subSubCategoryLine = {
    code: string,
    name: string,
    subCategoryCode: string
}

export const generateSubSubCategories = async (aliments: AlimentLine[], log = false) => {

    const subSubCategories = new Set<string>();
    const subSubCategoryList: subSubCategoryLine[] = [];
    let subSubCategoryCount = 0;

    for (const aliment of aliments) {
        const actualAliment = aliment as AlimentLine;

        if (actualAliment.alim_ssssgrp_code === null || actualAliment.alim_ssssgrp_code === SubSubCategoryService.NULL_CODE_VALUE || subSubCategories.has(actualAliment.alim_ssssgrp_code)) {
            continue;
        }

        subSubCategories.add(actualAliment.alim_ssssgrp_code);
        subSubCategoryList.push({
            code: actualAliment.alim_ssssgrp_code,
            name: capitalize(actualAliment.alim_ssssgrp_nom_fr),
            subCategoryCode: actualAliment.alim_ssgrp_code
        });
    }

    for (const subSubCategory of subSubCategoryList) {
        subSubCategoryCount++;
        await generate(subSubCategory, log);
    }

    console.log(`Generated ${subSubCategoryCount} subSubCategories`)
}

const generate = async (subSubCategory: subSubCategoryLine, log: boolean) => {
    const url = 'http://localhost:3000/subsubcategory/create';

    const {data} = await axios.post(url, subSubCategory);

    printAxiosData("SubSubCategory", data, log)
}