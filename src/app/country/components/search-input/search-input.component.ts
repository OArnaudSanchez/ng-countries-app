import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'country-search-input',
  imports: [FormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {
  searchValue = signal('');
  placeholder = input<string>('Buscar');
  emitValue = output<string>();

  onEmitValue(){
    this.emitValue.emit(this.searchValue());
    this.searchValue.set('');
  }

}
