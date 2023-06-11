import xlsx from 'xlsx'
import axios from "axios";
import {generateCategories} from "./parts/generateCategories";
import {generateSubCategories} from "./parts/generateSubCategories";
import {generateSubSubCategories} from "./parts/generateSubSubCategories";
import {generateAliments} from "./parts/generateAliments";

export type AlimentLine = {
    alim_code: string,
    alim_nom_fr: string,
    alim_grp_code: string,
    alim_grp_nom_fr: string,
    alim_ssgrp_code: string,
    alim_ssgrp_nom_fr: string,
    alim_ssssgrp_code: string,
    alim_ssssgrp_nom_fr: string,
    'Energie, Règlement UE N° 1169/2011 (kJ/100 g)': string,
    'Energie, Règlement UE N° 1169/2011 (kcal/100 g)': string,
    'Energie, N x facteur Jones, avec fibres (kJ/100 g)': string,
    'Energie, N x facteur Jones, avec fibres (kcal/100 g)': string,
    'Eau (g/100 g)': string,
    'Protéines, N x facteur de Jones (g/100 g)': string,
    'Protéines, N x 6.25 (g/100 g)': string,
    'Glucides (g/100 g)': string,
    'Lipides (g/100 g)': string,
    'Sucres (g/100 g)': string,
    'Fructose (g/100 g)': string,
    'Galactose (g/100 g)': string,
    'Glucose (g/100 g)': string,
    'Lactose (g/100 g)': string,
    'Maltose (g/100 g)': string,
    'Saccharose (g/100 g)': string,
    'Amidon (g/100 g)': string,
    'Fibres alimentaires (g/100 g)': string,
    'Polyols totaux (g/100 g)': string,
    'Cendres (g/100 g)': string,
    'Alcool (g/100 g)': string,
    'Acides organiques (g/100 g)': string,
    'AG saturés (g/100 g)': string,
    'AG monoinsaturés (g/100 g)': string,
    'AG polyinsaturés (g/100 g)': string,
    'AG 4:0, butyrique (g/100 g)': string,
    'AG 6:0, caproïque (g/100 g)': string,
    'AG 8:0, caprylique (g/100 g)': string,
    'AG 10:0, caprique (g/100 g)': string,
    'AG 12:0, laurique (g/100 g)': string,
    'AG 14:0, myristique (g/100 g)': string,
    'AG 16:0, palmitique (g/100 g)': string,
    'AG 18:0, stéarique (g/100 g)': string,
    'AG 18:1 9c (n-9), oléique (g/100 g)': string,
    'AG 18:2 9c,12c (n-6), linoléique (g/100 g)': string,
    'AG 18:3 c9,c12,c15 (n-3), alpha-linolénique (g/100 g)': string,
    'AG 20:4 5c,8c,11c,14c (n-6), arachidonique (g/100 g)': string,
    'AG 20:5 5c,8c,11c,14c,17c (n-3) EPA (g/100 g)': string,
    'AG 22:6 4c,7c,10c,13c,16c,19c (n-3) DHA (g/100 g)': string,
    'Cholestérol (mg/100 g)': string,
    'Sel chlorure de sodium (g/100 g)': string,
    'Calcium (mg/100 g)': string,
    'Chlorure (mg/100 g)': string,
    'Cuivre (mg/100 g)': string,
    'Fer (mg/100 g)': string,
    'Iode (µg/100 g)': string,
    'Magnésium (mg/100 g)': string,
    'Manganèse (mg/100 g)': string,
    'Phosphore (mg/100 g)': string,
    'Potassium (mg/100 g)': string,
    'Sélénium (µg/100 g)': string,
    'Sodium (mg/100 g)': string,
    'Zinc (mg/100 g)': string,
    'Rétinol (µg/100 g)': string,
    'Beta-Carotène (µg/100 g)': string,
    'Vitamine D (µg/100 g)': string,
    'Vitamine E (mg/100 g)': string,
    'Vitamine K1 (µg/100 g)': string,
    'Vitamine K2 (µg/100 g)': string,
    'Vitamine C (mg/100 g)': string,
    'Vitamine B1 ou Thiamine (mg/100 g)': string,
    'Vitamine B2 ou Riboflavine (mg/100 g)': string,
    'Vitamine B3 ou PP ou Niacine (mg/100 g)': string,
    'Vitamine B5 ou Acide pantothénique (mg/100 g)': string
}

const getAlimentsFromExcel = async (): Promise<AlimentLine[]> => {
    const DEFAULT_SHEET_NAME = 'ListeAliments';

    const alimentFile = xlsx.readFile(`${__dirname}/../vendors/Aliments.xlsx`);
    return xlsx.utils.sheet_to_json(alimentFile.Sheets[DEFAULT_SHEET_NAME]) as AlimentLine[];
}

(async () => {
    const alimentList = await getAlimentsFromExcel();

    //await generateCategories(alimentList);
    //await generateSubCategories(alimentList);
    //await generateSubSubCategories(alimentList);
    await generateAliments(alimentList);
})();