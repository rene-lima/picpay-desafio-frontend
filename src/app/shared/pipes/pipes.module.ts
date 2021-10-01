import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { BrlPipe } from './brl/brl.pipe'

@NgModule({
  declarations: [BrlPipe],
  exports: [BrlPipe],
  imports: [CommonModule]
})
export class PipesModule {}
