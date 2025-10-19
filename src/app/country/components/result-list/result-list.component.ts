import { DecimalPipe } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Country } from '../../models/country.model';
import { CountryTablePaginationComponent } from "../country-table-pagination/country-table-pagination.component";

@Component({
  selector: 'country-result-list',
  imports: [DecimalPipe, RouterLink, CountryTablePaginationComponent],
  templateUrl: './result-list.component.html',
  styleUrl: './result-list.component.css'
})
export class ResultListComponent {

  countries = input.required<Country[]>();
  errorMessage = input<string | null>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);

  paginatedCountries = signal<Country[]>([]);

  paginateCountries(paginatedCountries: Country[]){
    this.paginatedCountries.set(paginatedCountries);
  }
}
