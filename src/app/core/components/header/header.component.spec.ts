import { HeaderComponent } from './header.component'

describe('<app-header>', () => {
  let component: HeaderComponent

  beforeEach(() => {
    component = new HeaderComponent()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
