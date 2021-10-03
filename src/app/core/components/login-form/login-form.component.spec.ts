import { fakeAsync, tick } from '@angular/core/testing'
import { Router } from '@angular/router'
import { AuthService } from 'app/core/services/auth/auth.service'
import { QueryFilter } from 'app/shared/utils/http/query-filter.interface'
import { Subject } from 'rxjs'
import { LoginFormComponent } from './login-form.component'

describe('<app-login-form>', () => {
  let component: LoginFormComponent
  let authService: jasmine.SpyObj<AuthService>
  let router: jasmine.SpyObj<Router>

  beforeEach(() => {
    authService = jasmine.createSpyObj<AuthService>(['authenticateUser'], {
      userIsAuthenticated: new Subject()
    })

    router = jasmine.createSpyObj<Router>(['navigateByUrl'])

    component = new LoginFormComponent(authService, router)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should navigate to my payments if user is authenticated', fakeAsync(() => {
    component.ngOnInit()

    authService.userIsAuthenticated.next(true)

    tick()

    expect(router.navigateByUrl).toHaveBeenCalledWith('/payments/my-payments')
  }))

  it('should NOT navigate to my payments if user is not authenticated', fakeAsync(() => {
    component.ngOnInit()

    authService.userIsAuthenticated.next(false)

    tick()

    expect(router.navigateByUrl).not.toHaveBeenCalled()
  }))

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
