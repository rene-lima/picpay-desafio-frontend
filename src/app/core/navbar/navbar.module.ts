import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogoModule } from '@shared/logo/logo.module';

import { NavDesktopComponent } from './nav-desktop/nav-desktop.component';
import { NavDropdownComponent } from './nav-dropdown/nav-dropdown.component';
import { NavMobileComponent } from './nav-mobile/nav-mobile.component';
import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [NavbarComponent, NavDesktopComponent, NavMobileComponent, NavDropdownComponent],
  imports: [CommonModule, RouterModule, LogoModule],
  exports: [NavbarComponent]
})
export class NavbarModule {}
