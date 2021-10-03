import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProfileDetailsComponent } from './profile-details.component'
import { PoPageModule, PoAvatarModule, PoContainerModule, PoInfoModule } from '@po-ui/ng-components'

@NgModule({
  declarations: [ProfileDetailsComponent],
  exports: [ProfileDetailsComponent],
  imports: [CommonModule, PoPageModule, PoAvatarModule, PoContainerModule, PoInfoModule]
})
export class ProfileDetailsModule {}
