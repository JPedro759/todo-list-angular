import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet />
    <h1>sdfds</h1>
    <h2>sdfds</h2>
    <p>cvdscs</p>
  `,
})
export class AppComponent {
  title = 'todo-list-angular';
}
