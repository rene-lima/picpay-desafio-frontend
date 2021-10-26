import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    BrowserAnimationsModule
  ],
  exports: [
    AngularMaterialModule 
  ]
})
export class SharedModule { }
