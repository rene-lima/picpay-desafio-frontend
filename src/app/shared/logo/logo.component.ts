import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html'
})
export class LogoComponent {
  @Input() isWhiteLogo = false;

  constructor() {}
}
