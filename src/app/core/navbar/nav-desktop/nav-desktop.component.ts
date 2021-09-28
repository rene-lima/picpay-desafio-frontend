import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-desktop',
  template: `
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <app-logo [isWhiteLogo]="true"></app-logo>
      </div>
    </div>
  `
})
export class NavDesktopComponent {}
