import { DateUtils } from './date-utils'

describe('DateUtils', () => {
  it('should return hour and minute in format HH:MM from date string', () => {
    expect(DateUtils.getHourAndMinuteFromDate('2020-10-02T23:04:00Z')).toEqual('20:04')
    expect(DateUtils.getHourAndMinuteFromDate('2020-09-19T12:06:00Z')).toEqual('09:06')
  })

  it('should return full date: DD-MM-AAAA - HH:MM', () => {
    expect(DateUtils.getFullDateWithTime('2020-10-02T23:04:00Z')).toEqual('02/10/2020 - 20:04')
    expect(DateUtils.getFullDateWithTime('2020-09-19T12:06:00Z')).toEqual('19/09/2020 - 09:06')
  })

  it('should return formatted day', () => {
    expect(DateUtils.getDay(10)).toEqual('10')
    expect(DateUtils.getDay(4)).toEqual('04')
  })

  it('should return formatted month', () => {
    expect(DateUtils.getMonth(10)).toEqual('11')
    expect(DateUtils.getMonth(4)).toEqual('05')
  })
})
