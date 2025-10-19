import { Component, computed, effect, input, output, signal } from '@angular/core';
import { Country } from '../../models/country.model';

@Component({
  selector: 'country-table-pagination',
  imports: [],
  templateUrl: './country-table-pagination.component.html',
  styleUrl: './country-table-pagination.component.css'
})
export class CountryTablePaginationComponent {
  countries = input.required<Country[]>();

  pageSize = signal(10);
  currentPage = signal(1);

  totalPages = computed(() => Math.ceil((this.countries().length ?? 0) / this.pageSize()));

  paginatedCountries = computed(() => {
    const localCountries = this.countries() ?? [];
    const startElements = (this.currentPage() - 1) * this.pageSize();
    return localCountries.slice(startElements, startElements + this.pageSize());
  });

  countriesResult = output<Country[]>();

  constructor(){
    effect(() => {
      this.countriesResult.emit(this.paginatedCountries());
    });
  }

  nextPage() {
    if(this.currentPage() < this.totalPages()){
      this.currentPage.update(current => current + 1);
    }
  }

  previousPage(){
    if(this.currentPage() > 1){
      this.currentPage.update(current => current - 1);
    }
  }

  get isPreviousButtonDisabled(){
    return this.currentPage() === 1;
  }

  get isNextButtonDisabled(){
    return this.currentPage() === this.totalPages();
  }
}
