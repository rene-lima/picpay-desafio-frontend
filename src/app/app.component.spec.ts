import { AppComponent } from './app.component'

describe('<app-root>', () => {
  let app: AppComponent

  beforeEach(() => {
    app = new AppComponent()
  })

  it('should create the app', () => {
    expect(app).toBeTruthy()
  })

  it('should have a title `desafio-picpay/hugo-andreas-albrecht` by default', () => {
    expect(app.title).toEqual('desafio-picpay/hugo-andreas-albrecht')
  })
})
