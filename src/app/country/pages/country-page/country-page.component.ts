import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { CountryService } from '../../services/country.service';
import { CountryInformationComponent } from "./country-information/country-information.component";


@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css',
})
export class CountryPageComponent{

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly countryService = inject(CountryService);


  code = toSignal(
    this.activatedRoute.params.pipe(map((params) => params['code']))
  );

  countryResource = rxResource({
    request: () => ({ code: this.code() }),
    loader: ({ request }) => this.countryService.searchByCountryCode(request.code)
  });

}
