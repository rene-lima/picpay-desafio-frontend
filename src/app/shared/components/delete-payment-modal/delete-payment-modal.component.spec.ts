import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'
import { PoModalComponent } from '@po-ui/ng-components'
import { Payment } from 'app/core/entities/payment/payment.interface'
import { DeletePaymentService } from 'app/core/services/payments/delete-payment/delete-payment.service'
import { of } from 'rxjs'

import { DeletePaymentModalComponent } from './delete-payment-modal.component'

describe('<app-delete-payment-modal>', () => {
  let component: DeletePaymentModalComponent
  let deletePaymentService: jasmine.SpyObj<DeletePaymentService>

  const payment: Payment = {
    id: 2,
    name: 'Foster Orthmann',
    username: 'forthmann1',
    title: 'Professor',
    value: 207.36,
    date: '2021-01-28T14:01:29Z',
    image: 'https://robohash.org/quasetqui.png?size=150x150&set=set1',
    isPayed: true
  }

  beforeEach(() => {
    jasmine.getEnv().allowRespy(true)

    deletePaymentService = jasmine.createSpyObj<DeletePaymentService>(['Delete'])

    component = new DeletePaymentModalComponent(deletePaymentService)

    component.modal = jasmine.createSpyObj<PoModalComponent>(['open', 'close'])
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should open modal', () => {
    const spy = spyOn(component.modal, 'open')

    expect(component.paymentToBeDeleted).toBeUndefined()

    component.open(payment)

    expect(component.paymentToBeDeleted).toEqual(payment)
    expect(spy).toHaveBeenCalled()
  })

  it('should delete payment, emit event paymentWasDeleted and close modal', fakeAsync(() => {
    deletePaymentService.Delete.and.returnValue(of(null))
    const closeModalSpy = spyOn(component.modal, 'close')
    const eventEmitterSpy = spyOn(component.paymentWasDeleted, 'emit')

    component.open(payment)

    component['deletePayment']()

    tick()

    expect(deletePaymentService.Delete).toHaveBeenCalledWith('2')
    expect(closeModalSpy).toHaveBeenCalled()
    expect(eventEmitterSpy).toHaveBeenCalled()
  }))
})
