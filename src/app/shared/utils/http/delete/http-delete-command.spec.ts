import { HttpClient } from '@angular/common/http'
import { HttpDeleteCommand } from './http-delete-command'

describe('HttpDeleteCommand', () => {
  let httpDeleteCommand: HttpDeleteCommand
  let httpClient: jasmine.SpyObj<HttpClient>

  beforeEach(() => {
    httpClient = jasmine.createSpyObj<HttpClient>(['delete'])

    httpDeleteCommand = new HttpDeleteCommand(httpClient, 'http:localhost:3000/test')
  })

  it('should be created', () => {
    expect(httpDeleteCommand).toBeTruthy()
  })

  it('should call httpClient delete with endpoint received from host service and replace url with id', () => {
    httpDeleteCommand.Delete('123')

    expect(httpClient.delete).toHaveBeenCalledWith('http:localhost:3000/test')
  })
})
