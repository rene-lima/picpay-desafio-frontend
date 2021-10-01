import { HttpClient } from '@angular/common/http'
import { HttpPut } from './http-put'

describe('HttpPut', () => {
  let httpPut: HttpPut<{ name: string }>
  let httpClient: jasmine.SpyObj<HttpClient>

  beforeEach(() => {
    httpClient = jasmine.createSpyObj<HttpClient>(['put'])

    httpPut = new HttpPut(httpClient, 'http:localhost:3000/{0}')
  })

  it('should be created', () => {
    expect(httpPut).toBeTruthy()
  })

  it('should call httpClient put with endpoint received from host service, entity and replace endpoint url with id,', () => {
    httpPut.Put({ name: 'test-mock' }, '123')

    expect(httpClient.put).toHaveBeenCalledWith('http:localhost:3000/123', { name: 'test-mock' })
  })
})
