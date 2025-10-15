import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Country } from '../../models/country.model';

@Component({
  selector: 'country-result-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './result-list.component.html',
  styleUrl: './result-list.component.css'
})
export class ResultListComponent {

  countries = input.required<Country[]>();
  errorMessage = input<string | null>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);

}
