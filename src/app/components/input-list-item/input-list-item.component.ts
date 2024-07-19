import { Component, EventEmitter, input, Input, output, Output } from '@angular/core';
import { IListItems } from '../../interfaces/IListItems';

@Component({
  selector: 'app-input-list-item',
  standalone: true,
  imports: [],
  templateUrl: './input-list-item.component.html',
  styleUrl: './input-list-item.component.scss',
})
export class InputListItemComponent {
  inputListItems = input.required<IListItems[]>()

  changeCheckbox = output<{ id: string; checked: boolean }>()

  emitCheckboxChange(id: string, checked: boolean) {
    return this.changeCheckbox.emit({ id, checked });
  }

  changeText = output<{ id: string; value: string }>();

  emitTextChange(id: string, value: string) {
    return this.changeText.emit({ id, value });
  }

  deleteItem = output<string>();

  deleteItemOfList(id: string) {
    return this.deleteItem.emit(id);
  }
}
