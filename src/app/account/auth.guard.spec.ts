import { TestBed, inject } from '@angular/core/testing'
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing'

import { AuthGuard } from './auth.guard'
import BrowserStorage from '../../assets/utils/browser-storage'

describe('Validando se o usuário está autenticado', () => {


  let route: ActivatedRouteSnapshot
  let state: RouterStateSnapshot

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        providers: [AuthGuard]
    })
    .compileComponents()
  })

  afterEach(() => {
    BrowserStorage.remove('token')
  })

  it('Usuário está autenticado', inject([AuthGuard], (service: AuthGuard) => {
    BrowserStorage.set('token', 'TOKENTEST')
    expect(service.canActivate(route, state)).toBeTruthy()
  }))

  it('Usuário não está autenticado', inject([AuthGuard], (service: AuthGuard) => {
    expect(service.canActivate(route, state)).toBeFalsy()
  }))
})