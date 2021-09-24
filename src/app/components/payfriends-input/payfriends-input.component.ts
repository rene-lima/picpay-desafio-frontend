import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, forwardRef, NgZone } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SuperPlaceholder } from '../../../assets/utils/superPlaceholder'

const  INPUT_FIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PayfriendsInputComponent),
  multi: true
}

@Component({
  selector: 'payfriends-input',
  templateUrl: './payfriends-input.component.html',
  styleUrls: ['./payfriends-input.component.scss'],
  providers: [ INPUT_FIELD_VALUE_ACCESSOR ]
})
export class PayfriendsInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
  
  @Input() id: string
  @Input() uniqueid: string
  @Input() label: string
  @Input() icon: string
  @Input() placeholder: string
  @Input() placeholders = { placeholders: '', preText: ''}
  @Input() type: string = 'input'
  @Input() tokens: Object
  @Input() masked = false
  @Input() isMoney = false
  @Input() mask: any
  @Input() thousandSeparator: any
  @Input() specialCharacters: any
  @Input() isReadOnly = false
  @Input() disabled = false
  @Input() pattern: any
  @Output() changeValue = new EventEmitter()
  @Output() actionEnter = new EventEmitter()
  @Output() iconAction = new EventEmitter()

  iconSrc:string
  options = { prefix: 'R$ ', thousands: '.', decimal: ',' }
  private innerValue: any
  sp
  constructor(private zone: NgZone){}

  get value(){
    return this.innerValue
  }
  set value (v: any) {
    if(v !== this.innerValue) {
      this.innerValue = v
      this.onchangeCb(v)
    }
  }
  ngOnInit(): void {
    if(this.icon) this.iconSrc = `.../../../assets/icons/${this.icon}.svg`
    if(this.placeholders.placeholders) {
      this.zone.runOutsideAngular(() => {
        this.sp = new SuperPlaceholder({
          placeholders: this.placeholders.placeholders,
          preText: this.placeholders.preText,
          stay: 1000,
          speed: 100,
          element: `#${this.uniqueid}`
        })
        this.sp.init();
      })
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
    const { value, key } = event.target
    if(key !== 'Enter'){
      this.changeValue.emit(value) 
    }
  }
  callIconAction(){
    this.iconAction.emit(this.innerValue)
  }
  keyUpEnter(event){
    const { key } = event
    const { value } = event.target
    if(key === 'Enter'){
      this.actionEnter.emit(value)
    }
  }
  ngOnDestroy() {
    if(this.placeholders.placeholders) {
      this.sp.kill()
    }
  }
}
