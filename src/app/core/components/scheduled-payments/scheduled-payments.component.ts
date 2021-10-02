import { DEFAULT_REQUESTS_TIMEOUT } from './../../../shared/utils/contants'
import { debounceTime, switchMap } from 'rxjs/operators'
import { DEFAULT_PERPAGE_REGISTERS } from 'app/shared/utils/contants'
import { QueryFilter } from 'app/shared/utils/http/query-filter.interface'
import { Component, OnInit } from '@angular/core'
import { PoTableColumn } from '@po-ui/ng-components'
import { Payment } from 'app/core/entities/payment/payment.interface'
import { GetPaymentsService } from 'app/core/services/payments/get-payments/get-payments.service'
import { Observable, Subject } from 'rxjs'

@Component({
  selector: 'app-scheduled-payments',
  templateUrl: './scheduled-payments.component.html',
  styles: ['.table-container { display: flex; flex-direction: column; }'],
  providers: [GetPaymentsService]
})
export class ScheduledPaymentsComponent implements OnInit {
  isLoading = false

  payments?: Payment[] = []

  totalPaymentsLength: number = 0

  filterPaymentByUsername$ = new Subject<string>()

  readonly registersPerPage = DEFAULT_PERPAGE_REGISTERS

  columns: PoTableColumn[] = [
    { property: 'username', label: 'Usuário', width: '15%', type: 'cellTemplate' },
    { property: 'title', label: 'Título', width: '20%' },
    { property: 'date', label: 'Data', width: '20%', type: 'cellTemplate' },
    { property: 'value', label: 'Valor', width: '20%', type: 'cellTemplate' },
    { property: 'isPayed', label: 'Pago', width: '10%', type: 'cellTemplate' },
    { property: 'actions', label: 'Opções', width: '10%', type: 'cellTemplate' }
  ]

  constructor(private readonly getPaymentsService: GetPaymentsService) {}

  ngOnInit(): void {
    this.filterPaymentByUsername$
      .pipe(
        debounceTime(DEFAULT_REQUESTS_TIMEOUT),
        switchMap(usernameToBeFiltered => this.getFilteredPaymentsByUsername(usernameToBeFiltered as string))
      )
      .subscribe(res => this.mapData(res))

    this.getPayments()
  }

  private mapData({ payments, totalPayments }: { payments: Payment[]; totalPayments: number }): void {
    this.payments = payments
    this.totalPaymentsLength = totalPayments
    this.isLoading = false
  }

  getPayments(clickedPageIndex?: number): void {
    let filters: QueryFilter[] = []

    if (clickedPageIndex) {
      filters = [{ field: '_page', value: clickedPageIndex.toString() }]
    }

    this.isLoading = true
    this.getPaymentsService.getPayments(filters.length ? filters : undefined).subscribe(res => this.mapData(res))
  }

  private getFilteredPaymentsByUsername(
    usernameToBeFiltered: string
  ): Observable<{ payments: Payment[]; totalPayments: number }> {
    let filters: QueryFilter[] = []

    if (usernameToBeFiltered) {
      filters = [{ field: 'username', value: usernameToBeFiltered }]
    }

    return this.getPaymentsService.getPayments(filters.length ? filters : undefined)
  }

  whenUsernameHasBeenTyped(usernameToBeFiltered: string): void {
    this.filterPaymentByUsername$.next(usernameToBeFiltered)
  }
}
