import { TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Region } from '../../types/region.type';

@Component({
  selector: 'country-button',
  imports: [RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './country-button.component.html',
  styleUrl: './country-button.component.css'
})
export class CountryButtonComponent {

  region = input.required<Region>();

}
