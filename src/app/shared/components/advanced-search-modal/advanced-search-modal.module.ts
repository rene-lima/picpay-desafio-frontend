import { PoFieldModule, PoModalModule } from '@po-ui/ng-components'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AdvancedSearchModalComponent } from './advanced-search-modal.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [AdvancedSearchModalComponent],
  exports: [AdvancedSearchModalComponent],
  imports: [CommonModule, ReactiveFormsModule, PoModalModule, PoFieldModule]
})
export class AdvancedSearchModalModule {}
