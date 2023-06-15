import axios from "axios";
import {AlimentLine} from "../setupData";
import {capitalize} from "../capitalize";
import {printAxiosData} from "../AxiosResultManager";

type categoryLine = { code: string, name: string }

export const generateCategories = async (aliments: AlimentLine[], log = false) => {

    const categories = new Set<string>();
    const categoryList: categoryLine[] = [];
    let categoryCount = 0;

    for (const aliment of aliments) {
        const actualAliment = aliment as AlimentLine;
        if (categories.has(actualAliment.alim_grp_code)) continue;
        categories.add(actualAliment.alim_grp_code);
        categoryList.push({
            code: actualAliment.alim_grp_code,
            name: capitalize(actualAliment.alim_grp_nom_fr)
        });
    }

    for (const category of categoryList) {
        categoryCount++;
        await generate(category, log);
    }

    console.log(`Generated ${categoryCount} categories`)
}

const generate = async (category: categoryLine, log: boolean) => {
    const url = 'http://localhost:3000/category/create';

    const {data} = await axios.post(url, category);

    printAxiosData("Category", data, log)
}