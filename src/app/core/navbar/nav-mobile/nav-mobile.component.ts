import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '@models/login/user.interface';

@Component({
  selector: 'app-nav-mobile',
  templateUrl: './nav-mobile.component.html'
})
export class NavMobileComponent {
  @Input() user: User;
  @Output() loggedOut = new EventEmitter();

  onLogOut() {
    this.loggedOut.emit();
  }
}
