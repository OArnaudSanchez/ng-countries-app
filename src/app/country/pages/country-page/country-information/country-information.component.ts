import { DecimalPipe, KeyValuePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Country } from '../../../models/country.model';

@Component({
  selector: 'country-information',
  imports: [DecimalPipe, KeyValuePipe],
  templateUrl: './country-information.component.html',
  styleUrl: './country-information.component.css',
})
export class CountryInformationComponent {
  country = input.required<Country>();

  private readonly sanitizer = inject(DomSanitizer);

    getMapEmbedUrl(): SafeResourceUrl {
    const embedUrl = `https://www.google.com/maps?q=${this.country().latitude},${this.country().longitude}&z=6&output=embed`;

    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}
