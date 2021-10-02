import { QueryFilter } from '../query-filter.interface'
import { HttpClient, HttpParams } from '@angular/common/http'
import { HttpGet } from 'app/shared/utils/http/get/http-get'

fdescribe('HttpGet', () => {
  let httpGet: HttpGet<{ id: string }>
  let httpClient: jasmine.SpyObj<HttpClient>

  const filters: QueryFilter[] = [
    { field: 'testField', value: 'testValue' },
    { field: 'testField2', value: 'testValue2' }
  ]

  beforeEach(() => {
    httpClient = jasmine.createSpyObj<HttpClient>(['get'])

    httpGet = new HttpGet(httpClient, 'http:localhost:3000/test')

    httpGet.setQueryFilter(filters)
  })

  it('should be created', () => {
    expect(httpGet).toBeTruthy()
  })

  it('should mount http params from query filters receveid', () => {
    expect(httpGet['httpParams']).toEqual(
      new HttpParams().set('testField', 'testValue').set('testField2', 'testValue2')
    )
  })

  it('should call httpClient get with endpoint received from host service and http params', () => {
    httpGet.Get()

    expect(httpClient.get).toHaveBeenCalledWith('http:localhost:3000/test', {
      observe: 'response' as any,
      params: httpGet['httpParams']
    })
  })
})
