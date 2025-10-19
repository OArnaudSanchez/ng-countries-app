import { Component, effect, input, linkedSignal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'country-search-input',
  imports: [FormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {
  
  placeholder = input<string>('Buscar');
  inputInitialValue = input<string>('');
  emitValue = output<string>();
  
  searchValue = linkedSignal(() => this.inputInitialValue());
  inputValue = linkedSignal<string>(() => this.inputInitialValue());

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.emitValue.emit(value);
    }, 2000);

    onCleanup(() => {
      clearTimeout(timeout);
    });

  });

  onEmitValue(){
    this.emitValue.emit(this.searchValue());
  }

}
