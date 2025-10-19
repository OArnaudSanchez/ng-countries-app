import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ResultListComponent } from "../../components/result-list/result-list.component";
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryService } from '../../services/country.service';


@Component({
  selector: 'app-by-capital-page',
  imports: [FormsModule, SearchInputComponent, ResultListComponent],
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent {

  private readonly countryService = inject(CountryService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = signal(this.queryParam);

  countryResource = rxResource({
    request: () => ({ query: this.query() }),

    loader: ({ request }) => {
      if(!request.query) return of([]);

      this.router.navigate(['/country/by-capital'], { queryParams: { query: request.query } });
      return this.countryService.searchByCapital(request.query);
    }
  });

  errorMessage = signal(this.countryResource.error() as string);
  
  // countryResource = resource({
  //   request: () => ({ query: this.query() }),

  //   loader: async({ request }) => {
  //     if(!request.query) return [];

  //     return await firstValueFrom(this.countryService.searchByCapital(request.query));
  //   }
  // });

  // isLoading = signal(false);
  // error = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  searchCountry(query: string){
    this.query.set(query);
    // if(this.isLoading()) return;

    // this.isLoading.set(true);
    // this.countryService.searchByCapital(query)
    //   .subscribe({
    //     next: (countries) => {
    //       this.countries.set(countries);
    //     },
    //     error: (error) => {
    //       this.countries.set([]);
    //       this.error.set(error);
    //     },
    //     complete: () => {
    //       this.isLoading.set(false);
    //     }
    //   });
    
  }
}
