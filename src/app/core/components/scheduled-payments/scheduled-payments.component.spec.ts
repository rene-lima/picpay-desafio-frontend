import { EditPaymentService } from 'app/core/services/payments/edit-payment/edit-payment.service'
import { DEFAULT_REQUESTS_TIMEOUT } from './../../../shared/utils/contants'
import { fakeAsync, tick } from '@angular/core/testing'
import { of } from 'rxjs'
import { GetPaymentsService } from 'app/core/services/payments/get-payments/get-payments.service'
import { ScheduledPaymentsComponent } from './scheduled-payments.component'

describe('<app-scheduled-payments>', () => {
  let component: ScheduledPaymentsComponent
  let getPaymentsService: jasmine.SpyObj<GetPaymentsService>
  let editPaymentsService: jasmine.SpyObj<EditPaymentService>

  const payment = {
    id: 4,
    name: 'Letitia Crolly',
    username: 'lcrolly3',
    title: 'Web Developer I',
    value: 183.58,
    date: '2021-07-10T20:39:48Z',
    image: 'https://robohash.org/estveniamet.png?size=150x150&set=set1',
    isPayed: false
  }

  beforeEach(() => {
    getPaymentsService = jasmine.createSpyObj<GetPaymentsService>(['getPayments'])
    editPaymentsService = jasmine.createSpyObj<EditPaymentService>(['Put'])

    component = new ScheduledPaymentsComponent(getPaymentsService, editPaymentsService)

    getPaymentsService.getPayments.and.returnValue(
      of({
        totalPayments: 1,
        payments: [payment]
      })
    )
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fetch data from getPaymentsService and populate payments array with response', fakeAsync(() => {
    component.ngOnInit()

    tick()

    expect(getPaymentsService.getPayments).toHaveBeenCalledWith(undefined)
    expect(component.payments.length).toBe(1)
    expect(component.totalPaymentsLength).toBe(1)
    expect(component.payments[0].username).toEqual('lcrolly3')
  }))

  it('should fetch data with filters receveid when user select the page', fakeAsync(() => {
    component.getPayments({ pageIndex: 4, perPage: 5 })

    tick()

    expect(getPaymentsService.getPayments).toHaveBeenCalledWith([
      { field: '_page', value: '4' },
      { field: '_limit', value: '5' }
    ])
    expect(component.payments.length).toBe(1)
    expect(component.totalPaymentsLength).toBe(1)
    expect(component.payments[0].username).toEqual('lcrolly3')
  }))

  it('should fetch data with advanced filters receveid', fakeAsync(() => {
    component.getPayments(null, [
      { field: 'title_like', value: 'test-title' },
      { field: 'isPayed', value: 'true' }
    ])

    tick()

    expect(getPaymentsService.getPayments).toHaveBeenCalledWith([
      { field: 'title_like', value: 'test-title' },
      { field: 'isPayed', value: 'true' }
    ])
    expect(component.payments.length).toBe(1)
    expect(component.totalPaymentsLength).toBe(1)
    expect(component.payments[0].username).toEqual('lcrolly3')
  }))

  it('should fetch data from getPaymentsService with username filter', fakeAsync(() => {
    component.ngOnInit()

    component.whenUsernameHasBeenTyped('test-mock-username')

    tick(DEFAULT_REQUESTS_TIMEOUT)

    expect(getPaymentsService.getPayments).toHaveBeenCalledWith([
      { field: 'username_like', value: 'test-mock-username' }
    ])
  }))

  it('should NOT fetch data from getPaymentsService with username filter if hasnt username to be filtered', fakeAsync(() => {
    component.ngOnInit()

    component.whenUsernameHasBeenTyped('')

    tick(DEFAULT_REQUESTS_TIMEOUT)

    expect(getPaymentsService.getPayments).toHaveBeenCalledWith(undefined)
  }))

  it('should update payment property isPayed', fakeAsync(() => {
    const paymentAfterEdition = {
      id: 4,
      name: 'Letitia Crolly',
      username: 'lcrolly3',
      title: 'Web Developer I',
      value: 183.58,
      date: '2021-07-10T20:39:48Z',
      image: 'https://robohash.org/estveniamet.png?size=150x150&set=set1',
      isPayed: true
    }

    editPaymentsService.Put.and.returnValue(of(null))

    expect(payment.isPayed).toBeFalse()

    component.updateIfPaymentIsPayed(payment, true)

    tick()

    expect(editPaymentsService.Put).toHaveBeenCalledWith(paymentAfterEdition, '4')
  }))
})
