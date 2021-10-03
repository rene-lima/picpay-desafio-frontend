import { Component, EventEmitter, Output, ViewChild } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { PoModalAction, PoModalComponent } from '@po-ui/ng-components'
import { QueryFilter } from 'app/shared/utils/http/query-filter.interface'

@Component({
  selector: 'app-advanced-search-modal',
  templateUrl: './advanced-search-modal.component.html'
})
export class AdvancedSearchModalComponent {
  @ViewChild(PoModalComponent, { static: true }) modal?: PoModalComponent

  @Output() selectedFiltersToSearch = new EventEmitter<QueryFilter[]>()

  actions: PoModalAction[] = [
    { label: 'Pesquisar', action: () => this.filter() },
    { label: 'Cancelar', action: () => this.close() }
  ]

  form = new FormGroup({
    title: new FormControl(null),
    date: new FormControl(null),
    isPayed: new FormControl(false)
  })

  constructor() {}

  open(): void {
    this.form.reset()
    this.modal.open()
  }

  close(): void {
    this.form.reset()
    this.modal.close()
  }

  filter(): void {
    const filters = this.mountFilters()

    if (filters.length) this.selectedFiltersToSearch.emit(filters)

    this.close()
  }

  private mountFilters(): QueryFilter[] {
    let filters: QueryFilter[] = []
    const fields = ['title', 'date', 'isPayed']

    fields.forEach(field => {
      if (this.form.controls[field].value)
        filters.push({ field: `${field}_like`, value: String(this.form.controls[field].value) })
    })

    return filters
  }
}
