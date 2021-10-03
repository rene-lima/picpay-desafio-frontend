import { Component } from '@angular/core'
import { PoDropdownAction } from '@po-ui/ng-components'
import { AuthService } from 'app/core/services/auth/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  actions: PoDropdownAction[] = [
    { label: 'Perfil', action: () => {} },
    { label: 'Sair', action: () => this.authService.logoutUser() }
  ]

  constructor(private readonly authService: AuthService) {}
}
