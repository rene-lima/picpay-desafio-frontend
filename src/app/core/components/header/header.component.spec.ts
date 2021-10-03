import { AuthService } from 'app/core/services/auth/auth.service'
import { HeaderComponent } from './header.component'

describe('<app-header>', () => {
  let component: HeaderComponent
  let authService: jasmine.SpyObj<AuthService>

  beforeEach(() => {
    authService = jasmine.createSpyObj<AuthService>(['logoutUser'])

    component = new HeaderComponent(authService)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
