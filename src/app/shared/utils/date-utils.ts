export class DateUtils {
  static getHourAndMinuteFromDate(dateFromString: string): string {
    const date = new Date(dateFromString)
    let hour = String(date.getHours())
    let minute = String(date.getMinutes())

    if (date.getHours() < 10) {
      hour = `0${hour}`
    }

    if (date.getMinutes() < 10) {
      minute = `0${minute}`
    }

    return `${hour}:${minute}`
  }

  static getFullDateWithTime(dateFromString: string): string {
    const date = new Date(dateFromString)
    let day = this.getDay(date.getDate())
    let month = this.getMonth(date.getMonth())
    let year = date.getFullYear()

    return `${day}/${month}/${year} - ${this.getHourAndMinuteFromDate(dateFromString)}`
  }

  static getDay(day: number): string {
    return day < 10 ? `0${day}` : String(day)
  }

  static getMonth(month: number): string {
    month++
    return month < 10 ? `0${month}` : String(month)
  }
}
