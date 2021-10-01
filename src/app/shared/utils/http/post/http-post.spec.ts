import { HttpClient } from '@angular/common/http'
import { HttpPost } from './http-post'

describe('HttpPost', () => {
  let httpPost: HttpPost<{ id: string }>
  let httpClient: jasmine.SpyObj<HttpClient>

  beforeEach(() => {
    httpClient = jasmine.createSpyObj<HttpClient>(['post'])

    httpPost = new HttpPost(httpClient, 'http:localhost:3000/test')
  })

  it('should be created', () => {
    expect(httpPost).toBeTruthy()
  })

  it('should call httpClient Post with endpoint received from host service and entity', () => {
    httpPost.Post({ id: '1' })

    expect(httpClient.post).toHaveBeenCalledWith('http:localhost:3000/test', { id: '1' })
  })
})
