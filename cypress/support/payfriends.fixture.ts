export interface PayFriendsFixture {
  value: Value
  selector: Selector
}

interface Value {
  email: string
  password: string
  usernameToBeFiltered: string
  titleToCreatePayment: string
  nameToCreatePayment: string
  valueToCreatePayment: string
  usernameToCreatePayment: string
  dateToCreatePayment: string
}

interface Selector {
  loginWelcome: string
  loginPasswordInput: string
  loginEmailInput: string
  loginButton: string
  searchUsernameInput: string
  advancedSearchButton: string
  removeAdvancedFiltersButton: string
  selectPerpageButton: string
  addNewPaymentButton: string
  paymentModal: string
  paymentModalNameInput: string
  paymentModalUsernameInput: string
  paymentModalValueInput: string
  paymentModalDateInput: string
  paymentModalTitleInput: string
  paymentModalSaveButton: string
  paymentEditButton: string
  paymentDeleteButton: string
  deletePaymentModal: string
  deletePaymentModalSaveButton: string
  headerDropdown: string
  headerDropdownProfileOption: string
  headerDropdownLogoutOption: string
  profileDetail: string
  profileName: string
  profileEmail: string
  advancedSearchModal: string
  advancedSearchModalTitleInput: string
  advancedSearchModalSaveButton: string
}
