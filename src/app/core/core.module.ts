import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderModule } from './header/header.module';
import { NavbarModule } from './navbar/navbar.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, RouterModule],
  exports: [NotFoundComponent, NavbarModule, HeaderModule]
})
export class CoreModule {}
