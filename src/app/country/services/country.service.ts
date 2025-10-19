import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country-mapper';
import { Country } from '../models/country.model';
import { RestCountry } from '../models/rest-countries.model';
import { Region } from '../types/region.type';

const API_BASE_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly httpClient = inject(HttpClient);
  private readonly queryCache = new Map<string, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    const lowerCaseQuery = query.toLowerCase();

    if (this.queryCache.has(query)) {
      return of(this.queryCache.get(query)!);
    }

    const endpoint = 'capital';
    const errorMessage = `No se encontró un pais con la capital: ${query}`;
    return this.makeHttpRequest(endpoint, lowerCaseQuery, errorMessage);
  }

  searchByCountry(query: string): Observable<Country[]> {
    const lowerCaseQuery = query.toLowerCase();

    if (this.queryCache.has(query)) {
      return of(this.queryCache.get(query)!);
    }

    const endpoint = 'name';
    const errorMessage = `No se encontró un pais con el nombre: ${query}`;
    return this.makeHttpRequest(endpoint, lowerCaseQuery, errorMessage);
  }

  searchByCountryCode(countryCode: string): Observable<Country[]> {
    const endpoint = 'alpha';
    const errorMessage = `No se encontró un pais con el codigo: ${countryCode}`;
    return this.makeHttpRequest(endpoint, countryCode, errorMessage);
  }

  searchByRegion(region: Region): Observable<Country[]> {
    if (this.queryCache.has(region)) {
      return of(this.queryCache.get(region)!);
    }

    const endpoint = 'region';
    const errorMessage = `No se encontró una región con el nombre: ${region}`;
    return this.makeHttpRequest(endpoint, region, errorMessage);
  }

  private makeHttpRequest(
    endpoint: string,
    searchData: string,
    errorMessage: string
  ): Observable<Country[]> {
    return this.httpClient
      .get<RestCountry[]>(`${API_BASE_URL}/${endpoint}/${searchData}`)
      .pipe(
        map((countries) => CountryMapper.mapCountries(countries)),
        tap((countries) => this.queryCache.set(searchData, countries)),
        catchError((error) => {
          return throwError(() => new Error(errorMessage));
        })
      );
  }
}
