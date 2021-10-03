import { QueryFilter } from 'app/shared/utils/http/query-filter.interface'
import { TableActionsComponent } from './table-actions.component'

describe('<app-table-actions>', () => {
  let component: TableActionsComponent
  let selectedPaginationOptionsEmitter: jasmine.Spy
  let selectedAdvancedFiltersEmitter: jasmine.Spy

  beforeEach(() => {
    component = new TableActionsComponent()

    selectedPaginationOptionsEmitter = spyOn(component.selectedPaginationOptions, 'emit')
    selectedAdvancedFiltersEmitter = spyOn(component.selectedAdvancedFilters, 'emit')

    component.totalPaymentsLength = 100
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should emit the username to be filtered', () => {
    const usernameToBeFilteredSpy = spyOn(component.usernameToBeFiltered, 'emit')
    component.whenChangeUsernameFilter('test-username-mock')

    expect(usernameToBeFilteredSpy).toHaveBeenCalledWith('test-username-mock')
  })

  it('should emit advanced filters and set hasAdvancedFilters as true', () => {
    const filters: QueryFilter[] = [{ field: 'title_like', value: 'test-title' }]

    component.whenUserDoAdvancedSearch(filters)

    expect(selectedAdvancedFiltersEmitter).toHaveBeenCalledWith(filters)
    expect(component.hasAdvancedFilters).toBeTrue()
  })

  it('should emit empty advanced filters and set hasAdvancedFilters as false if user remove the filters', () => {
    component.whenUserRemoveAdvancedFilters()

    expect(selectedAdvancedFiltersEmitter).toHaveBeenCalledWith([])
    expect(component.hasAdvancedFilters).toBeFalse()
  })

  it('should calculate total pages with value of total payments and with page number', () => {
    expect(component['_totalPages']).toBe(20)

    component.totalPaymentsLength = 101

    expect(component['_totalPages']).toBe(21)
    expect(component.visiblePages).toEqual([1, 2, 3, 4, 5])
  })

  it('should set currentPageIndex with value received emit selected pagination options', () => {
    component.whenSelectPage(3)

    expect(selectedPaginationOptionsEmitter).toHaveBeenCalledWith({
      pageIndex: 3,
      perPage: 5
    })

    expect(component.visiblePages).toEqual([1, 2, 3, 4, 5])
  })

  it('should set currentPageIndex equals 1 and emit selected pagination options when first page is selected', () => {
    component.whenFirstPageSelected()

    expect(selectedPaginationOptionsEmitter).toHaveBeenCalledWith({
      pageIndex: 1,
      perPage: 5
    })

    expect(component.visiblePages).toEqual([1, 2, 3, 4, 5])
  })

  it('should set currentPageIndex equals page length and emit selected pagination options when last page is selected', () => {
    component.whenLastPageSelected()

    expect(selectedPaginationOptionsEmitter).toHaveBeenCalledWith({
      pageIndex: 20,
      perPage: 5
    })

    expect(component.visiblePages).toEqual([16, 17, 18, 19, 20])
  })

  it('should set currentPageIndex equals currentPage - 1 and emit selected pagination options when previous page is selected', () => {
    component.whenSelectPage(4)

    component.whenPreviousPageSelected()

    expect(selectedPaginationOptionsEmitter).toHaveBeenCalledWith({
      pageIndex: 3,
      perPage: 5
    })

    expect(component.visiblePages).toEqual([1, 2, 3, 4, 5])
  })

  it('should NOT set currentPageIndex equals currentPage - 1 and emit selected pagination options when previous page is selected if currentPageIndex is 1', () => {
    component.whenSelectPage(1)

    component.whenPreviousPageSelected()

    expect(selectedPaginationOptionsEmitter).not.toHaveBeenCalledWith({
      pageIndex: 0,
      perPage: 5
    })

    expect(component.visiblePages).toEqual([1, 2, 3, 4, 5])
  })

  it('should set currentPageIndex equals currentPage + 1 and emit selected pagination options when next page is selected', () => {
    component.whenSelectPage(4)

    component.whenNextPageSelected()

    expect(selectedPaginationOptionsEmitter).toHaveBeenCalledWith({
      pageIndex: 5,
      perPage: 5
    })

    expect(component.visiblePages).toEqual([4, 5, 6, 7, 8])
  })

  it('should NOT set currentPageIndex equals currentPage + 1 and emit selected pagination options when next page is selected if currentPageIndex + 1 bigger then total pages', () => {
    component.whenSelectPage(20)

    component.whenNextPageSelected()

    expect(selectedPaginationOptionsEmitter).not.toHaveBeenCalledWith({
      pageIndex: 21,
      perPage: 5
    })

    expect(component.visiblePages).toEqual([16, 17, 18, 19, 20])
  })

  it('should emit selected pagination of first page when per page is changed', () => {
    component['currentPageIndexSelected'] = 2
    component.form.get('perPage').setValue(10)

    component.whenPerPageValueIsSelected()

    expect(selectedPaginationOptionsEmitter).toHaveBeenCalledWith({
      pageIndex: 1,
      perPage: 10
    })

    expect(component.visiblePages).toEqual([1, 2, 3, 4, 5])
  })
})
