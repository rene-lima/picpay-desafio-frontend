import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginEmailComponent {
  @Input() parent: FormGroup;
  @Input() touchedButton = false;

  constructor() {}

  get email() {
    return this.parent.get('email');
  }
}
