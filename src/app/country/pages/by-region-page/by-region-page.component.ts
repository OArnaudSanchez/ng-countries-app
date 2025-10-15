import { TitleCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { map, of } from 'rxjs';
import { ResultListComponent } from '../../components/result-list/result-list.component';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-region-page',
  imports: [ResultListComponent, RouterLinkActive, RouterLink, TitleCasePipe],
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
      return { region: this.region() }
    },

    loader: ({ request }) => {
      if(!request.region) return of([]);

      return this.countryService.searchByRegion(request.region);
    }
  });  

  errorMessage = signal(this.countryResource.error() as string);

  regions: string[] = ['americas', 'africa', 'asia', 'europe', 'oceania', 'antarctic']; 
}
