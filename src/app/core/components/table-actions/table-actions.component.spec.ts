import { TableActionsComponent } from './table-actions.component'

describe('<app-table-actions>', () => {
  let component: TableActionsComponent
  let clickedPageIndexEmitterSpy: jasmine.Spy

  beforeEach(() => {
    component = new TableActionsComponent()

    clickedPageIndexEmitterSpy = spyOn(component.clickedPageIndex, 'emit')

    component.totalPaymentsLength = { value: 100, perPage: 5 }
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should calculate total pages with value of total payments and per page number', () => {
    expect(component['_totalPages']).toBe(20)

    component.totalPaymentsLength = { value: 101, perPage: 5 }

    expect(component['_totalPages']).toBe(21)
  })

  it('should set currentPageIndex with value received emit selected page', () => {
    component.whenSelectPage(3)

    expect(clickedPageIndexEmitterSpy).toHaveBeenCalledWith(3)
  })

  it('should set currentPageIndex equals 1 and emit value when first page is selected', () => {
    component.whenFirstPageSelected()

    expect(clickedPageIndexEmitterSpy).toHaveBeenCalledWith(1)
  })

  it('should set currentPageIndex equals page length and emit value when last page is selected', () => {
    component.whenLastPageSelected()

    expect(clickedPageIndexEmitterSpy).toHaveBeenCalledWith(20)
  })

  it('should set currentPageIndex equals currentPage - 1 and emit value when previous page is selected', () => {
    component.whenSelectPage(4)

    component.whenPreviousPageSelected()

    expect(clickedPageIndexEmitterSpy).toHaveBeenCalledWith(3)
  })

  it('should NOT set currentPageIndex equals currentPage - 1 and emit value when previous page is selected if currentPageIndex is 1', () => {
    component.whenSelectPage(1)

    component.whenPreviousPageSelected()

    expect(clickedPageIndexEmitterSpy).not.toHaveBeenCalledWith(0)
  })

  it('should set currentPageIndex equals currentPage + 1 and emit value when next page is selected', () => {
    component.whenSelectPage(4)

    component.whenNextPageSelected()

    expect(clickedPageIndexEmitterSpy).toHaveBeenCalledWith(5)
  })

  it('should NOT set currentPageIndex equals currentPage + 1 and emit value when next page is selected if currentPageIndex + 1 bigger then total pages', () => {
    component.whenSelectPage(20)

    component.whenNextPageSelected()

    expect(clickedPageIndexEmitterSpy).not.toHaveBeenCalledWith(21)
  })
})
