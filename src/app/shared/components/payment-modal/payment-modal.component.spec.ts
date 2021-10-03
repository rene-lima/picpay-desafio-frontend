import { fakeAsync, tick } from '@angular/core/testing'
import { PoModalComponent } from '@po-ui/ng-components'
import { Payment } from 'app/core/entities/payment/payment.interface'
import { CreatePaymentService } from 'app/core/services/payments/create-payment/create-payment.service'
import { EditPaymentService } from 'app/core/services/payments/edit-payment/edit-payment.service'
import { of } from 'rxjs'
import { PaymentModalComponent } from './payment-modal.component'

describe('<app-payment-modal>', () => {
  let component: PaymentModalComponent
  let createPaymentService: jasmine.SpyObj<CreatePaymentService>
  let editPaymentService: jasmine.SpyObj<EditPaymentService>

  beforeEach(() => {
    jasmine.getEnv().allowRespy(true)

    createPaymentService = jasmine.createSpyObj<CreatePaymentService>(['Post'])
    editPaymentService = jasmine.createSpyObj<EditPaymentService>(['Put'])

    component = new PaymentModalComponent(createPaymentService, editPaymentService)

    component.modal = jasmine.createSpyObj<PoModalComponent>(['open', 'close'])
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should open modal', () => {
    const spy = spyOn(component.modal, 'open')
    const control = component.form.get('name')

    control.setValue('test-mock')
    expect(control.value).toEqual('test-mock')

    component.open()

    expect(control.value).toBeNull()
    expect(component.title).toEqual('Adicionar pagamento')
    expect(spy).toHaveBeenCalled()
  })

  it('should close modal', () => {
    const spy = spyOn(component.modal, 'close')
    const control = component.form.get('name')

    control.setValue('test-mock')
    expect(control.value).toEqual('test-mock')

    component['close']()

    expect(control.value).toBeNull()
    expect(component.paymentBeingEdited).toBeUndefined()
    expect(spy).toHaveBeenCalled()
  })

  it('should open modal with edit mode', () => {
    const spy = spyOn(component.modal, 'open')

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

    component.openWithEditMode(payment)

    expect(component.paymentBeingEdited).toEqual(payment)
    expect(component.form.get('name').value).toEqual('Foster Orthmann')
    expect(component.form.get('username').value).toEqual('forthmann1')
    expect(component.form.get('date').value).toEqual('2021-01-28T14:01:29Z')
    expect(component.form.get('title').value).toEqual('Professor')
    expect(component.form.get('value').value).toEqual(207.36)
    expect(component.title).toEqual('Editar pagamento')
    expect(spy).toHaveBeenCalled()
  })

  it('should save new payment', fakeAsync(() => {
    createPaymentService.Post.and.returnValue(of(null))
    const eventEmitterSpy = spyOn(component.newPaymentWasRegistered, 'emit')
    const modalSpy = spyOn(component.modal, 'close')

    component.form.get('name').setValue('Foster Orthmann')
    component.form.get('username').setValue('forthmann1')
    component.form.get('date').setValue('2021-01-28')
    component.form.get('title').setValue('Professor')
    component.form.get('value').setValue(207.36)

    component['saveNewPayment']()

    tick()

    const payment: Payment = {
      name: 'Foster Orthmann',
      username: 'forthmann1',
      title: 'Professor',
      value: 207.36,
      date: '2021-01-28T00:00:00.000Z',
      isPayed: false
    } as any

    expect(createPaymentService.Post).toHaveBeenCalledWith(payment)
    expect(eventEmitterSpy).toHaveBeenCalled()
    expect(modalSpy).toHaveBeenCalled()
  }))

  it('shouldnt save new payment if form is invalid', fakeAsync(() => {
    const eventEmitterSpy = spyOn(component.newPaymentWasRegistered, 'emit')
    const modalSpy = spyOn(component.modal, 'close')

    component.form.get('name').setValue('Foster Orthmann')
    component.form.get('username').setValue('forthmann1')

    component['saveNewPayment']()

    tick()

    expect(createPaymentService.Post).not.toHaveBeenCalled()
    expect(eventEmitterSpy).not.toHaveBeenCalled()
    expect(modalSpy).not.toHaveBeenCalled()
  }))

  it('should edit payment', fakeAsync(() => {
    editPaymentService.Put.and.returnValue(of(null))
    const eventEmitterSpy = spyOn(component.paymentWasEdited, 'emit')
    const modalSpy = spyOn(component.modal, 'close')

    const paymentBeforeEdition: Payment = {
      id: 3,
      name: 'Crissie Summerill',
      username: 'csummerill2',
      title: 'VP Product Management',
      value: 464.54,
      date: '2020-02-09',
      image: 'https://robohash.org/natusinciduntsapiente.png?size=150x150&set=set1',
      isPayed: false
    }

    component.openWithEditMode(paymentBeforeEdition)

    component.form.get('value').setValue(500.0)

    component['savePaymentEdition']()

    tick()

    const paymentEdited: Payment = {
      id: 3,
      name: 'Crissie Summerill',
      username: 'csummerill2',
      title: 'VP Product Management',
      value: 500.0,
      date: '2020-02-09T00:00:00.000Z',
      image: 'https://robohash.org/natusinciduntsapiente.png?size=150x150&set=set1',
      isPayed: false
    }

    expect(editPaymentService.Put).toHaveBeenCalledWith(paymentEdited, '3')
    expect(eventEmitterSpy).toHaveBeenCalled()
    expect(modalSpy).toHaveBeenCalled()
  }))

  it('shouldnt edit payment if form is invalid', fakeAsync(() => {
    const eventEmitterSpy = spyOn(component.paymentWasEdited, 'emit')
    const modalSpy = spyOn(component.modal, 'close')

    const payment: Payment = {
      id: 3,
      name: 'Crissie Summerill',
      username: 'csummerill2',
      title: 'VP Product Management',
      value: 464.54,
      date: '2020-02-09T18:20:32Z',
      image: 'https://robohash.org/natusinciduntsapiente.png?size=150x150&set=set1',
      isPayed: false
    }

    component.openWithEditMode(payment)

    component.form.get('value').setValue(null)

    component['savePaymentEdition']()

    tick()

    expect(editPaymentService.Put).not.toHaveBeenCalled()
    expect(eventEmitterSpy).not.toHaveBeenCalled()
    expect(modalSpy).not.toHaveBeenCalled()
  }))
})
