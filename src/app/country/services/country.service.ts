import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country-mapper';
import { Country } from '../models/country.model';
import { RestCountry } from '../models/rest-countries.model';

const API_BASE_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly httpClient = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    const lowerCaseQuery = query.toLowerCase();
    return this.httpClient
      .get<RestCountry[]>(`${API_BASE_URL}/capital/${lowerCaseQuery}`)
      .pipe(
        map((countries) => CountryMapper.mapCountries(countries)),
        catchError((error) => {
          return throwError(
            () => new Error(`No se encontró un pais con la capital: ${query}`)
          );
        })
      );
  }

  searchByCountry(query: string) {
    const lowerCaseQuery = query.toLowerCase();
    return this.httpClient
      .get<RestCountry[]>(`${API_BASE_URL}/name/${lowerCaseQuery}`)
      .pipe(
        map((countries) => CountryMapper.mapCountries(countries)),
        catchError((error) => {
          return throwError(
            () => new Error(`No se encontró un pais con el nombre: ${query}`)
          );
        })
      );
  }

  searchByCountryCode(countryCode: string) {
    return this.httpClient
      .get<RestCountry[]>(`${API_BASE_URL}/alpha/${countryCode}`)
      .pipe(
        map((countries) => CountryMapper.mapCountries(countries)),
        map((countries) => countries.at(0)),
        catchError((error) => {
          return throwError(
            () =>
              new Error(`No se encontró un pais con el codigo: ${countryCode}`)
          );
        })
      );
  }

  searchByRegion(region: string) {
    return this.httpClient
      .get<RestCountry[]>(`${API_BASE_URL}/region/${region}`)
      .pipe(
        map((countries) => CountryMapper.mapCountries(countries)),
        catchError((error) => {
          console.log(error);
          return throwError(
            () =>
              new Error(`No se encontró una región con el nombre: ${region}`)
          );
        })
      );
  }

  //TODO: Complete this implementation to reduce code dupplication
  private makeHttpRequest(endpoint: string, searchData: string, errorMessage: string){
    return this.httpClient
          .get<RestCountry[]>(`${API_BASE_URL}/${endpoint}/${searchData}`)
          .pipe(
            map((countries) => CountryMapper.mapCountries(countries)),
            catchError((error) => {
              console.log(error);
              return throwError(
                () =>
                  new Error(errorMessage)
              );
            })
          );
  }

}
