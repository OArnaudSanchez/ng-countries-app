import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ResultListComponent } from '../../components/result-list/result-list.component';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, ResultListComponent],
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent {
  
  private readonly countryService = inject(CountryService);
  query = signal('');

  countryResource = rxResource({
    request: () => {
      return {
        query: this.query()
      }
    },

    loader: ({ request }) => {     
      if(!request.query) return of([]);
      
      return this.countryService.searchByCountry(request.query);
    }
  });
  
  errorMessage = signal(this.countryResource.error() as string);

  // countryResource = resource({
  //   request: () => {
  //     return {
  //       query: this.query()
  //     }
  //   },

  //   loader: async ({ request }) => {     
  //     if(!request.query) return [];
      
  //     return await firstValueFrom(this.countryService.searchByCountry(request.query));
  //   }
  // });

  searchCountry(query: string){
    this.query.set(query);
  }
}
