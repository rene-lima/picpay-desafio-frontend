import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'payfriends-main',
  templateUrl: './payfriends-main.component.html',
  styleUrls: ['./payfriends-main.component.scss']
})
export class PayfriendsMainComponent {
  @Input() title: string
  @Input() buttonText: string
  @Output() callAction = new EventEmitter()

  constructor() { }
  click(){
    this.callAction.emit()
  }
}
