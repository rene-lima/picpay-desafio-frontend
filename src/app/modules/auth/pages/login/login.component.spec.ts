import { LoginComponent } from './login.component'

describe('<app-login>', () => {
  let component: LoginComponent

  beforeEach(() => {
    component = new LoginComponent()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
