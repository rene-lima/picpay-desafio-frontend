import { PaymentsComponent } from './payments.component'

describe('<app-payments>', () => {
  let component: PaymentsComponent

  beforeEach(() => {
    component = new PaymentsComponent()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
