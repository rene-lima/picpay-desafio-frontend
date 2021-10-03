import { AdvancedSearchModalModule } from 'app/shared/components/advanced-search-modal/advanced-search-modal.module'
import { ReactiveFormsModule } from '@angular/forms'
import { PoButtonModule, PoFieldModule } from '@po-ui/ng-components'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TableActionsComponent } from './table-actions.component'

@NgModule({
  declarations: [TableActionsComponent],
  exports: [TableActionsComponent],
  imports: [CommonModule, PoFieldModule, PoButtonModule, ReactiveFormsModule, AdvancedSearchModalModule]
})
export class TableActionsModule {}
