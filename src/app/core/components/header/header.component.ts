import { Component, OnInit } from '@angular/core'
import { PoDropdownAction } from '@po-ui/ng-components'
import { User } from 'app/core/entities/user/user.interface'
import { AuthService } from 'app/core/services/auth/auth.service'
import { StorageService } from 'app/core/services/storage/storage.service'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  actions: PoDropdownAction[] = [
    { label: 'Perfil', action: () => {} },
    { label: 'Sair', action: () => this.authService.logoutUser() }
  ]

  getUser: Observable<User>

  constructor(private readonly authService: AuthService, private storageService: StorageService) {}

  ngOnInit(): void {
    this.getUser = this.storageService.get('user').pipe(map((user: string) => JSON.parse(user) as User))
  }
}
