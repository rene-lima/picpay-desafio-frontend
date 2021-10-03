import { PoPageSlideComponent } from '@po-ui/ng-components'
import { ProfileDetailsComponent } from './profile-details.component'

describe('<app-profile-details>', () => {
  let component: ProfileDetailsComponent
  let pageSlide: jasmine.SpyObj<PoPageSlideComponent>

  beforeEach(() => {
    pageSlide = jasmine.createSpyObj<PoPageSlideComponent>(['open'])

    component = new ProfileDetailsComponent()

    component.pageSlide = pageSlide
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should open page slide', () => {
    component.open()

    expect(pageSlide.open).toHaveBeenCalled()
  })
})
