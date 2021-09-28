import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent {
  @Input() buttonLabel: string;
  @Input() buttonType = 'button';

  @Output() clicked = new EventEmitter();

  constructor() {}

  onClick() {
    this.clicked.emit();
  }
}
