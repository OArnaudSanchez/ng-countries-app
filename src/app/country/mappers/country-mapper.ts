import { Country } from '../models/country.model';
import { RestCountry } from '../models/rest-countries.model';

export class CountryMapper {
  static mapCountry(country: RestCountry): Country {
    const {
      cca2,
      flags,
      capital,
      translations,
      population,
      coatOfArms,
      area,
      latlng,
      continents,
      subregion,
      timezones,
      idd,
      tld,
      languages,
      currencies,
      maps,
    } = country;

    return {
      code: cca2,
      icon: flags.png,
      flag: flags.svg,
      flagAlt: flags.alt,
      name: translations.spa.official,
      capital: capital?.join(', '),
      population: population,
      coatOfArms: coatOfArms.svg,
      area: area,
      latitude: latlng?.[0],
      longitude: latlng?.[1],
      translations: translations,
      continent: continents?.join(', '),
      subregion: subregion,
      timezone: timezones?.join(', '),
      phoneCode: idd.root,
      phoneSuffixes: idd?.suffixes?.join(', '),
      domain: tld?.[0],
      language: languages && Object.values(languages),
      currencies: currencies,
      mapUrl: maps.googleMaps,
    };
  }

  static mapCountries(countries: RestCountry[]): Country[] {
    return countries.map(this.mapCountry);
  }
}
