import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Account } from "src/app/_models/account/account";

@Component({
  selector: "pf-profile-form",
  templateUrl: "./profile-form.component.html",
  styleUrls: ["./profile-form.component.scss"],
})
export class ProfileFormComponent implements OnChanges {
  @Input()
  account: Account | null;

  @Output()
  cancelEvent = new EventEmitter();

  @Output()
  saveEvent = new EventEmitter();

  profileForm = this.fb.group(
    {
      name: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
    },
    { validator: this.passwordMatchValidator }
  );

  constructor(private fb: FormBuilder) {}

  ngOnChanges(): void {
    this.profileForm.patchValue({
      name: this.account.name,
      email: this.account.email,
      password: this.account.password,
    });
  }

  cancel() {
    this.cancelEvent.emit();
  }

  save() {
    this.saveEvent.emit(this.profileForm.value);
  }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls["password"].value ===
      frm.controls["confirmPassword"].value
      ? null
      : { mismatch: true };
  }
}
