import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-password',
  templateUrl: './login-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPasswordComponent {
  @Input() parent: FormGroup;
  @Input() touchedButton = false;
  toggled = false;

  constructor() {}

  onToggleChange() {
    this.toggled = !this.toggled;
  }

  get password() {
    return this.parent.get('password');
  }
}
