import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-payment-add-form',
  templateUrl: './payment-add-form.component.html'
})
export class PaymentAddFormComponent {
  @Input() parent: FormGroup;

  get username() {
    return this.parent.get('username');
  }

  get date() {
    return this.parent.get('date');
  }

  get value() {
    return this.parent.get('value');
  }
}
