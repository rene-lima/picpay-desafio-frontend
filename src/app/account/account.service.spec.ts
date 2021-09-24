import { TestBed, inject} from '@angular/core/testing';
import { AccountService } from './account.service';


describe('Validate authentication service', () => {
  let service: AccountService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountService],
    })
  })

  it('success authentication', inject([AccountService],async (service: AccountService) => {
    service.login({email: 'user@mail.com', password: 'password'})
    .then( resp => {
      expect(resp).toEqual('200')
    })
  }))
  it('authentication failed', inject([AccountService],async (service: AccountService) => {
    service.login({email: 'outheruser@mail.com', password: 'password'})
    .then(resp => {
      expect(resp).toEqual('200')
    })
  }))
})
