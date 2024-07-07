import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IListItems } from '../../interfaces/IListItems';

@Component({
  selector: 'app-input-list-item',
  standalone: true,
  imports: [],
  templateUrl: './input-list-item.component.html',
  styleUrl: './input-list-item.component.scss',
})
export class InputListItemComponent {
  @Input({ required: true })
  inputListItems: IListItems[] = [];

  @Output()
  changeCheckbox = new EventEmitter<{ id: string; checked: boolean }>();

  emitCheckboxChange(id: string, checked: boolean) {
    return this.changeCheckbox.emit({ id, checked });
  }

  @Output()
  changeText = new EventEmitter<{ id: string; value: string }>();

  emitTextChange(id: string, value: string) {
    return this.changeText.emit({ id, value });
  }

  @Output()
  deleteItem = new EventEmitter<string>();

  deleteItemOfList(id: string) {
    return this.deleteItem.emit(id);
  }
}
