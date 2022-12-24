import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<div class="app">
  <app-nav></app-nav>
  <main>
    <div class="container-fluid">
      <router-outlet></router-outlet>
    </div>
  </main>
</div>`
})
export class AppComponent {
  title = 'angular-tailwind-converter';
}
