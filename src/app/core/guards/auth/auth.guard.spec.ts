import { fakeAsync } from '@angular/core/testing'
import { StorageService } from 'app/core/services/storage/storage.service'
import { of } from 'rxjs'
import { AuthGuard } from './auth.guard'

describe('AuthGuard', () => {
  let guard: AuthGuard
  let storageService: jasmine.SpyObj<StorageService>

  beforeEach(() => {
    storageService = jasmine.createSpyObj<StorageService>(['get'])
    guard = new AuthGuard(storageService)
  })

  it('should be created', () => {
    expect(guard).toBeTruthy()
  })

  it('should return true if user is authenticated', fakeAsync(() => {
    storageService.get.and.returnValue(
      of(`{
      "id": 0,
      "name": "usuario",
      "email": "usuario@gmail.com",
      "password": "usuario"
    }`)
    )

    guard.canActivate(null, null).subscribe(canActivate => {
      expect(canActivate).toBeTrue()
    })
  }))

  it('should return false if user is NOT authenticated', fakeAsync(() => {
    storageService.get.and.returnValue(of(null))

    guard.canActivate(null, null).subscribe(canActivate => {
      expect(canActivate).toBeFalse()
    })
  }))
})
