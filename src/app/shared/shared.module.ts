import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonModule } from '@shared/button/button.module';

import { LogoModule } from './logo/logo.module';

@NgModule({
  exports: [MatDialogModule, ButtonModule, LogoModule]
})
export class SharedModule {}
