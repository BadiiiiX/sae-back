import axios from "axios";
import {AlimentLine} from "../setupData";
import {capitalize} from "../capitalize";

type categoryLine = { code: string, name: string }

export const generateCategories = async (aliments: AlimentLine[]) => {

    const categories = new Set<string>();
    const categoryList: categoryLine[] = [];

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
        axios.post('http://localhost:3000/category/create', category)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error.data);
            });
    }
}