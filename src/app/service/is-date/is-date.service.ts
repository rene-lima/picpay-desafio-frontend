import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class IsDateService {

  constructor() { }

  static validateDate(control: FormControl) {
    if (control.value) {
      return moment(control.value).isValid() ? null : { invalid: true };
    } else {
      return null;
    }
  }
}
