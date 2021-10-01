import { fakeAsync } from '@angular/core/testing'
import { QueryFilter } from 'app/shared/utils/http/query-filter.interface'
import { AuthService } from 'app/core/services/auth/auth.service'
import { LoginFormComponent } from './login-form.component'

describe('<app-login-form>', () => {
  let component: LoginFormComponent
  let authService: jasmine.SpyObj<AuthService>

  beforeEach(() => {
    authService = jasmine.createSpyObj<AuthService>(['authenticateUser'])

    component = new LoginFormComponent(authService)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should do login if the form is valid and call authservice with query filters', fakeAsync(() => {
    component.form.get('email').setValue('email@email.com')
    component.form.get('password').setValue('password')

    component.doLogin()

    const filters: QueryFilter[] = [
      { field: 'email', value: 'email@email.com' },
      { field: 'password', value: 'password' }
    ]

    expect(authService.authenticateUser).toHaveBeenCalledWith(filters)
  }))
})
