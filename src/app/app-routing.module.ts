import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./page/login/login.component";
import {LoginModule} from "./page/login/login.module";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
      RouterModule.forRoot(routes),
      LoginModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
