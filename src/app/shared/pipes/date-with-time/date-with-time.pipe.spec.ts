import { DateWithTimePipe } from './date-with-time.pipe'

describe('DateWithTimePipe', () => {
  const pipe = new DateWithTimePipe()

  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  it('should return date in format: DD/MM/AAAA - HH:MM', () => {
    expect(pipe.transform('2020-10-02T23:04:57Z')).toEqual('02/10/2020 - 20:04')
  })
})
