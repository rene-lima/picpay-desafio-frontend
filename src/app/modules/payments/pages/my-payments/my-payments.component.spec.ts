import { PaymentModalComponent } from 'app/shared/components/payment-modal/payment-modal.component'
import { MyPaymentsComponent } from './my-payments.component'

describe('<app-my-payments>', () => {
  let component: MyPaymentsComponent

  beforeEach(() => {
    jasmine.getEnv().allowRespy(true)

    component = new MyPaymentsComponent()

    component.modal = jasmine.createSpyObj<PaymentModalComponent>(['open'])
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should open modal to create payment', () => {
    const spy = spyOn(component.modal, 'open')

    component['createPayment']()

    expect(spy).toHaveBeenCalled()
  })
})
