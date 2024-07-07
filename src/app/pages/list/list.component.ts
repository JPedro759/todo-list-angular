import { Component, signal } from '@angular/core';
import { IListItems } from '../../interfaces/IListItems';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { InputListItemComponent } from '../../components/input-list-item/input-list-item.component';
import { ELocalStorage } from '../../enums/ELocalStorage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [InputAddItemComponent, InputListItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  addItem = signal(true);

  #setListItems = signal<IListItems[]>(this.#parseItems());

  getListItems = this.#setListItems.asReadonly();

  #parseItems() {
    return JSON.parse(localStorage.getItem(ELocalStorage.MY_LIST) || '[]');
  }

  #updateLocalStorage() {
    return localStorage.setItem(
      ELocalStorage.MY_LIST,
      JSON.stringify(this.#setListItems())
    );
  }

  getItems(value: IListItems) {
    localStorage.setItem(
      ELocalStorage.MY_LIST,
      JSON.stringify([...this.#setListItems(), value])
    );

    return this.#setListItems.set(this.#parseItems());
  }

  deleteAllItems() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'All your files have been deleted.',
          icon: 'success',
        });

        localStorage.removeItem(ELocalStorage.MY_LIST);

        return this.#setListItems.set(this.#parseItems());
      }
    });
  }

  listItemsStage(value: 'pending' | 'completed') {
    return this.getListItems().filter((res: IListItems) =>
      value === 'pending' ? !res.checked : res.checked
    );
  }

  emitChangeCheckbox(newItem: { id: string; checked: boolean }) {
    this.#setListItems.update((oldValue: IListItems[]) => {
      oldValue.filter((res) => {
        if (res.id === newItem.id) {
          res.checked = newItem.checked;

          return res;
        }

        return res;
      });

      return oldValue;
    });

    return this.#updateLocalStorage();
  }

  emitTextChange(newItem: { id: string; value: string }) {
    this.#setListItems.update((oldValue: IListItems[]) => {
      oldValue.filter((res) => {
        if (res.id === newItem.id) {
          res.value = newItem.value;

          return res;
        }

        return res;
      });

      return oldValue;
    });

    return this.#updateLocalStorage();
  }

  deleteItemOfList(id: string) {
    this.#setListItems.update((oldValue: IListItems[]) =>
      oldValue.filter((res) => res.id !== id)
    );

    return this.#updateLocalStorage();
  }
}
