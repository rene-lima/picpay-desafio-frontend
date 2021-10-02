import { fakeAsync, tick } from '@angular/core/testing'
import { of } from 'rxjs'
import { GetPaymentsService } from 'app/core/services/payments/get-payments/get-payments.service'
import { ScheduledPaymentsComponent } from './scheduled-payments.component'

describe('<app-scheduled-payments>', () => {
  let component: ScheduledPaymentsComponent
  let getPaymentsService: jasmine.SpyObj<GetPaymentsService>

  beforeEach(() => {
    getPaymentsService = jasmine.createSpyObj<GetPaymentsService>(['getPayments'])

    component = new ScheduledPaymentsComponent(getPaymentsService)

    getPaymentsService.getPayments.and.returnValue(
      of({
        totalPayments: 1,
        payments: [
          {
            id: 4,
            name: 'Letitia Crolly',
            username: 'lcrolly3',
            title: 'Web Developer I',
            value: 183.58,
            date: '2021-07-10T20:39:48Z',
            image: 'https://robohash.org/estveniamet.png?size=150x150&set=set1',
            isPayed: false
          }
        ]
      })
    )
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fetch data from get payments service and populate payments array with response', fakeAsync(() => {
    component.ngOnInit()

    tick()

    expect(getPaymentsService.getPayments).toHaveBeenCalledWith(undefined)
    expect(component.payments.length).toBe(1)
    expect(component.totalPaymentsLength).toBe(1)
    expect(component.payments[0].username).toEqual('lcrolly3')
  }))

  it('should fetch data with filters receveid when user select the page', fakeAsync(() => {
    component.getPayments(4)

    tick()

    expect(getPaymentsService.getPayments).toHaveBeenCalledWith([{ field: '_page', value: '4' }])
    expect(component.payments.length).toBe(1)
    expect(component.totalPaymentsLength).toBe(1)
    expect(component.payments[0].username).toEqual('lcrolly3')
  }))
})
