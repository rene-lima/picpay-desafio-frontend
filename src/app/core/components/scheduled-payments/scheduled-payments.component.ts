import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { PoTableColumn } from '@po-ui/ng-components'
import { Pagination } from 'app/core/entities/pagination/pagination.interface'
import { Payment, PaymentResponse } from 'app/core/entities/payment/payment.interface'
import { EditPaymentService } from 'app/core/services/payments/edit-payment/edit-payment.service'
import { GetPaymentsService } from 'app/core/services/payments/get-payments/get-payments.service'
import { DEFAULT_REQUESTS_TIMEOUT } from 'app/shared/utils/contants'
import { QueryFilter } from 'app/shared/utils/http/query-filter.interface'
import { Observable, Subject } from 'rxjs'
import { debounceTime, switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-scheduled-payments',
  templateUrl: './scheduled-payments.component.html',
  styles: ['.table-container { flex-direction: column; }']
})
export class ScheduledPaymentsComponent implements OnInit {
  isLoading = false

  payments?: Payment[] = []

  totalPaymentsLength: number = 0

  filterPaymentByUsername$ = new Subject<string>()

  columns: PoTableColumn[] = [
    { property: 'username', label: 'Usuário', width: '15%', type: 'cellTemplate' },
    { property: 'title', label: 'Título', width: '20%' },
    { property: 'date', label: 'Data', width: '20%', type: 'cellTemplate' },
    { property: 'value', label: 'Valor', width: '20%', type: 'cellTemplate' },
    { property: 'isPayed', label: 'Pago', width: '10%', type: 'cellTemplate' },
    { property: 'actions', label: 'Opções', width: '10%', type: 'cellTemplate' }
  ]

  form = new FormGroup({
    isPayed: new FormControl()
  })

  constructor(
    private readonly getPaymentsService: GetPaymentsService,
    private readonly editPaymentService: EditPaymentService
  ) {}

  ngOnInit(): void {
    this.filterPaymentByUsername$
      .pipe(
        debounceTime(DEFAULT_REQUESTS_TIMEOUT),
        switchMap(usernameToBeFiltered => this.getFilteredPaymentsByUsername(usernameToBeFiltered as string))
      )
      .subscribe(res => this.mapData(res))

    this.getPayments()
  }

  private mapData({ payments, totalPayments }: PaymentResponse): void {
    this.payments = payments
    this.totalPaymentsLength = totalPayments
    this.isLoading = false
  }

  getPayments(paginationOptions?: Pagination, advancedFilters?: QueryFilter[]): void {
    let filters: QueryFilter[] = []

    if (paginationOptions) {
      filters = [
        { field: '_page', value: String(paginationOptions.pageIndex) },
        { field: '_limit', value: String(paginationOptions.perPage) }
      ]
    }

    if (advancedFilters?.length) {
      filters = [...filters, ...advancedFilters]
    }

    this.isLoading = true
    this.getPaymentsService.getPayments(filters.length ? filters : undefined).subscribe(res => this.mapData(res))
  }

  private getFilteredPaymentsByUsername(usernameToBeFiltered: string): Observable<PaymentResponse> {
    let filters: QueryFilter[] = []

    if (usernameToBeFiltered) {
      filters = [{ field: 'username_like', value: usernameToBeFiltered }]
    }

    return this.getPaymentsService.getPayments(filters.length ? filters : undefined)
  }

  whenUsernameHasBeenTyped(usernameToBeFiltered: string): void {
    this.filterPaymentByUsername$.next(usernameToBeFiltered)
  }

  updateIfPaymentIsPayed(payment: Payment, isPayed: boolean): void {
    payment.isPayed = isPayed
    const updatePayment: Payment = { ...payment }

    this.isLoading = true
    this.editPaymentService.Put(updatePayment, String(payment.id)).subscribe(() => {
      this.isLoading = false
    })
  }
}
