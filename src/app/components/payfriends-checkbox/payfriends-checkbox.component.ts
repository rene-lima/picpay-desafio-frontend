import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const  INPUT_FIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PayfriendsCheckboxComponent),
  multi: true
}

@Component({
  selector: 'payfriends-checkbox',
  templateUrl: './payfriends-checkbox.component.html',
  styleUrls: ['./payfriends-checkbox.component.scss'],
  providers: [ INPUT_FIELD_VALUE_ACCESSOR ]
})
export class PayfriendsCheckboxComponent implements ControlValueAccessor {
  isChecked = false
  @Input() disabled: boolean
  @Input() label: string
  @Input() isReadOnly = false
  @Output() changeValue = new EventEmitter()

  private innerValue: any
  
  get value(){
    return this.innerValue
  }
  set value (v: any) {
    if(v !== this.innerValue) {
      this.innerValue = v
      this.onchangeCb(v)
    }
  }
  onchangeCb: (_:any) => void = () => {}
  onTouchedCb: (_:any) => void = () => {}

  writeValue(v: any): void {
    this.value = v
  }
  registerOnChange(fn: any): void {
    this.onchangeCb = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isReadOnly = isDisabled
  }
  onKey(event) {
    this.changeValue.emit(event) 
  }
}
