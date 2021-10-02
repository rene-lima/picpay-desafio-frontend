import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './header.component'
import { PoAvatarModule } from '@po-ui/ng-components'

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [CommonModule, PoAvatarModule, RouterModule]
})
export class HeaderModule {}
