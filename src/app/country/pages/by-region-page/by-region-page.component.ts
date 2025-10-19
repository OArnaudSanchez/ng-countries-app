import { Component, inject, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map, of } from 'rxjs';
import { CountryButtonComponent } from "../../components/country-button/country-button.component";
import { ResultListComponent } from '../../components/result-list/result-list.component';
import { CountryService } from '../../services/country.service';
import { Region } from '../../types/region.type';

function validateQueryParam(queryParam: string): Region {
  queryParam = queryParam?.toLowerCase();

  const validRegions: Record<string, Region> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic',
  };

  return validRegions[queryParam] ?? 'Americas';
}


@Component({
  selector: 'app-by-region-page',
  imports: [ResultListComponent, CountryButtonComponent],
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent {
  
  private readonly countryService = inject(CountryService);
  private readonly activatedRoute = inject(ActivatedRoute);

  region = toSignal(
    this.activatedRoute.queryParams.pipe(map((params) => params['region']))
  );

  countryResource = rxResource({
    request: () => {
      return { region: validateQueryParam(this.region()) }
    },

    loader: ({ request }) => {
      if(!request.region) return of([]);

      return this.countryService.searchByRegion(request.region);
    }
  });  

  errorMessage = signal(this.countryResource.error() as string);

  regions: Region[] = ['americas', 'africa', 'asia', 'europe', 'oceania', 'antarctic']; 
}
