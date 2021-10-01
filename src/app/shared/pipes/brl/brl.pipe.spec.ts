import { BrlPipe } from './brl.pipe'

describe('BrlPipe', () => {
  const pipe = new BrlPipe()

  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  it('should return a formatted value with BLR pattern', () => {
    expect(pipe.transform(100.34)).toBe('R$ 100,34')
  })
})
