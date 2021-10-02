import { DateUtils } from './../../utils/date-utils'
import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'dateWithTime'
})
export class DateWithTimePipe implements PipeTransform {
  transform(dateFromString: string): string {
    return DateUtils.getFullDateWithTime(dateFromString)
  }
}
