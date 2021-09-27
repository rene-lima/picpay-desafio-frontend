import { NgModule } from '@angular/core';
import { ButtonModule } from '@shared/button/button.module';
import { InputModule } from '@shared/input/input.module';

import { LogoModule } from './logo/logo.module';

@NgModule({
  exports: [InputModule, ButtonModule, LogoModule]
})
export class SharedModule {}
