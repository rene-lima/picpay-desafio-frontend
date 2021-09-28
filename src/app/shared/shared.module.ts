import { NgModule } from '@angular/core';
import { ButtonModule } from '@shared/button/button.module';

import { LogoModule } from './logo/logo.module';

@NgModule({
  exports: [ButtonModule, LogoModule]
})
export class SharedModule {}
