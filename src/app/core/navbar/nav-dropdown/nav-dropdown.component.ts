import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav-dropdown',
  templateUrl: './nav-dropdown.component.html'
})
export class NavDropdownComponent {
  @Output() loggedOut = new EventEmitter();
  isMenuOpened = false;

  onLogOut() {
    this.loggedOut.emit();
  }

  showMenu() {
    this.isMenuOpened = !this.isMenuOpened;
  }
}
