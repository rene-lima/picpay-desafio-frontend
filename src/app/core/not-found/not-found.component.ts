import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="relative text-center w-80 h-48 my-24 mx-auto">
      <p class="relative text-9xl text-black text-center">404</p>
      <h2>Ops!</h2>
      <p>Essa página não existe.</p>
      <p>Volte a <a [routerLink]="['/']" class="underline">página inicial</a>.</p>
    </div>
  `
})
export class NotFoundComponent {}
