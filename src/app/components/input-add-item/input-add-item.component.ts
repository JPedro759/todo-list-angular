import { NgClass } from '@angular/common';
import { IListItems } from '../../interfaces/IListItems';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  input,
  output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-input-add-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss',
})
export class InputAddItemComponent {
  #cdr = inject(ChangeDetectorRef);

  @ViewChild('inputText')
  inputText!: ElementRef;

  inputListItems = input.required<IListItems[]>();

  outputAddListItem = output<IListItems>();

  focusAndAddItem(value: string) {
    if (value) {
      this.#cdr.detectChanges();
      this.inputText.nativeElement.value = '';

      const currentDate = new Date();
      const id = currentDate.getTime().toString();

      this.outputAddListItem.emit({ id, checked: false, value });

      return this.inputText.nativeElement.focus();
    }
  }
}
