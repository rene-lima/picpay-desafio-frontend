import { fakeAsync } from '@angular/core/testing'
import { StorageService } from './storage.service'

describe('StorageService', () => {
  let service: StorageService
  let sessionStorage = {}

  const value = `{
    "id": 0,
    "name": "usuario",
    "email": "usuario@gmail.com",
    "password": "usuario"
  }`

  beforeEach(() => {
    service = new StorageService()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should set value in session storage', () => {
    const spy = spyOn(window.sessionStorage, 'setItem').and.callFake(
      (key: string, value: string) => (sessionStorage[key] = value + '')
    )

    service.set('user', value)

    expect(spy).toHaveBeenCalledWith('user', value)
    expect(sessionStorage['user']).toEqual(value)
  })

  it('should get value from session storage', fakeAsync(() => {
    sessionStorage = {
      user: value
    }

    const spy = spyOn(window.sessionStorage, 'getItem').and.callFake((key: string) => sessionStorage[key])

    service.get('user').subscribe(user => expect(user).toEqual(value))
    expect(spy).toHaveBeenCalledWith('user')
  }))

  it('should clear session storage', () => {
    const spy = spyOn(window.sessionStorage, 'clear').and.callFake(() => (sessionStorage = {}))

    sessionStorage = {
      user: value
    }

    expect(sessionStorage).toEqual({
      user: value
    })

    service.clear()

    expect(sessionStorage).toEqual({})
    expect(spy).toHaveBeenCalled()
  })
})
