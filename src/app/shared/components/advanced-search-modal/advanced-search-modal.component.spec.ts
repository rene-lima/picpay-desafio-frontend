import { PoModalComponent } from '@po-ui/ng-components'
import { AdvancedSearchModalComponent } from './advanced-search-modal.component'

describe('<app-advanced-search-modal>', () => {
  let component: AdvancedSearchModalComponent
  let modal: jasmine.SpyObj<PoModalComponent>

  beforeEach(() => {
    component = new AdvancedSearchModalComponent()

    modal = jasmine.createSpyObj<PoModalComponent>(['open', 'close'])

    component.modal = modal

    component.form.get('title').setValue('test-title')
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should reset form and open modal', () => {
    component.open()

    expect(modal.open).toHaveBeenCalled()
  })

  it('should reset form and close modal', () => {
    component.close()

    expect(modal.close).toHaveBeenCalled()
  })

  it('should mount filters, emit if has length and close modal', () => {
    component.form.get('isPayed').setValue(true)

    const selectedAdvancedFiltersEmitterSpy = spyOn(component.selectedFiltersToSearch, 'emit')

    component.filter()

    expect(selectedAdvancedFiltersEmitterSpy).toHaveBeenCalledWith([
      { field: 'title_like', value: 'test-title' },
      { field: 'isPayed_like', value: 'true' }
    ])

    expect(modal.close).toHaveBeenCalled()
  })

  it('should NOT mount filters if hasnt length, just close modal', () => {
    component.form.reset()

    const selectedAdvancedFiltersEmitterSpy = spyOn(component.selectedFiltersToSearch, 'emit')

    component.filter()

    expect(selectedAdvancedFiltersEmitterSpy).not.toHaveBeenCalled()

    expect(modal.close).toHaveBeenCalled()
  })
})
