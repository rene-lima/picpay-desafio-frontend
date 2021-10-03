import { AuthService } from 'app/core/services/auth/auth.service'
import { StorageService } from 'app/core/services/storage/storage.service'
import { HeaderComponent } from './header.component'

describe('<app-header>', () => {
  let component: HeaderComponent
  let authService: jasmine.SpyObj<AuthService>
  let storageService: jasmine.SpyObj<StorageService>

  beforeEach(() => {
    authService = jasmine.createSpyObj<AuthService>(['logoutUser'])
    storageService = jasmine.createSpyObj<StorageService>(['get'])

    component = new HeaderComponent(authService, storageService)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
