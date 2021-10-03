import { HttpClient } from '@angular/common/http'
import { fakeAsync, tick } from '@angular/core/testing'
import { Router } from '@angular/router'
import { StorageService } from 'app/core/services/storage/storage.service'
import { QueryFilter } from 'app/shared/utils/http/query-filter.interface'
import { of } from 'rxjs'
import { AuthService } from './auth.service'

describe('AuthService', () => {
  let service: AuthService
  let http: jasmine.SpyObj<HttpClient>
  let storageService: jasmine.SpyObj<StorageService>
  let router: jasmine.SpyObj<Router>

  const filters: QueryFilter[] = [
    {
      field: 'username',
      value: 'test-username'
    },
    {
      field: 'password',
      value: 'test-password'
    }
  ]

  beforeEach(() => {
    http = jasmine.createSpyObj<HttpClient>(['get'])
    storageService = jasmine.createSpyObj<StorageService>(['get', 'clear', 'set'])
    router = jasmine.createSpyObj<Router>(['navigateByUrl'])

    service = new AuthService(http, storageService, router)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should emit userIsAuthenticated as false if service return null user', fakeAsync(() => {
    const spy = spyOn(service.userIsAuthenticated, 'next')
    spyOn(service, 'Get').and.returnValue(of({ body: null } as any))

    service.authenticateUser(filters)

    tick()

    expect(spy).toHaveBeenCalledWith(false)
  }))

  it('should emit userIsAuthenticated as true if service return user and set in session storage', fakeAsync(() => {
    const spy = spyOn(service.userIsAuthenticated, 'next')

    spyOn(service, 'Get').and.returnValue(
      of({ body: [{ id: 0, name: 'usuario', email: 'usuario@gmail.com', password: 'usuario' }] } as any)
    )

    service.authenticateUser(filters)

    tick()

    expect(storageService.set).toHaveBeenCalledWith(
      'user',
      `{"id":0,"name":"usuario","email":"usuario@gmail.com","password":"usuario"}`
    )
    expect(spy).toHaveBeenCalledWith(true)
  }))

  it('should emit userIsAuthenticated as false if user loged out, clear session storage and navigate to login', () => {
    const spy = spyOn(service.userIsAuthenticated, 'next')

    service.logoutUser()

    expect(storageService.clear).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith(false)
    expect(router.navigateByUrl).toHaveBeenCalledWith('/')
  })
})
