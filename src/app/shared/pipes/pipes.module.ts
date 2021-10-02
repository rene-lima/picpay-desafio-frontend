import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { BrlPipe } from './brl/brl.pipe'
import { DateWithTimePipe } from './date-with-time/date-with-time.pipe'

@NgModule({
  declarations: [BrlPipe, DateWithTimePipe],
  exports: [BrlPipe, DateWithTimePipe],
  imports: [CommonModule]
})
export class PipesModule {}
