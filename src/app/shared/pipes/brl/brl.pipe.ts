import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'brl'
})
export class BrlPipe implements PipeTransform {
  transform(value: number): string {
    const brlValue = value.toString().replace('.', ',')
    return `R$ ${brlValue}`
  }
}
