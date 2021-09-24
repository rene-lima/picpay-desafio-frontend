import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'payfriends-button',
  templateUrl: './payfriends-button.component.html',
  styleUrls: ['./payfriends-button.component.scss']
})
export class PayfriendsButtonComponent implements OnInit {
  @Input() id: string
  @Input() disabled: boolean
  @Input() loading: boolean
  @Input() secondary: boolean
  @Output() onClick = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  click(event){
    this.onClick.emit(event)
  }

}
