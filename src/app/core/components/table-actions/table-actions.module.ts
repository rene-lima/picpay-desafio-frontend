import { ReactiveFormsModule } from '@angular/forms'
import { PoButtonModule, PoFieldModule } from '@po-ui/ng-components'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TableActionsComponent } from './table-actions.component'

@NgModule({
  declarations: [TableActionsComponent],
  exports: [TableActionsComponent],
  imports: [CommonModule, PoFieldModule, PoButtonModule, ReactiveFormsModule]
})
export class TableActionsModule {}
