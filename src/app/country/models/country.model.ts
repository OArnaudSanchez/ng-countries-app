import { Currencies, Translations } from "./rest-countries.model";

export interface Country{
    code: string;
    icon: string;
    flag: string;
    flagAlt: string;
    name: string;
    capital: string;
    population: number;
    coatOfArms: string;
    area: number;
    latitude: number;
    longitude: number;
    translations: Translations;
    continent: string;
    subregion:  string;
    timezone: string;
    phoneCode: string;
    phoneSuffixes: string;
    domain: string;
    language: string[];
    currencies: Currencies;
    mapUrl: string;
}