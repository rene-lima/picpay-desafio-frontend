import { Component, Input, ViewChild } from '@angular/core'
import { PoPageSlideComponent } from '@po-ui/ng-components'
import { User } from 'app/core/entities/user/user.interface'

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html'
})
export class ProfileDetailsComponent {
  @ViewChild(PoPageSlideComponent, { static: true }) pageSlide?: PoPageSlideComponent

  @Input() user: User

  constructor() {}

  open(): void {
    this.pageSlide.open()
  }
}
