import { PayFriendsFixture } from '../support/payfriends.fixture'

context('PayFriends', () => {
  let fixture: PayFriendsFixture

  beforeEach(() => {
    cy.fixture('payfriends')
      .then(value => (fixture = value))
      .then(() => visitAndDoLogin(fixture, '/'))
  })

  it('should filter by username', () => {
    cy.get(fixture.selector.searchUsernameInput)
      .type(fixture.value.usernameToBeFiltered)
      .wait(1100)
      .get('.po-info-value')
      .contains('vfeedhamk')
  })

  it('should add new payment', () => {
    cy.get(fixture.selector.addNewPaymentButton)
      .contains('Adicionar pagamento')
      .click()
      .get(fixture.selector.paymentModal)
      .contains('Adicionar pagamento')

      .get(fixture.selector.paymentModalNameInput)
      .type(fixture.value.nameToCreatePayment)

      .get(fixture.selector.paymentModalTitleInput)
      .type(fixture.value.titleToCreatePayment)

      .get(fixture.selector.paymentModalUsernameInput)
      .type(fixture.value.usernameToCreatePayment)

      .get(fixture.selector.paymentModalValueInput)
      .type(fixture.value.valueToCreatePayment)

      .get(fixture.selector.paymentModalDateInput)
      .type(fixture.value.dateToCreatePayment)

      .get(fixture.selector.paymentModalSaveButton)
      .click()

      .wait(1100)
      .get(fixture.selector.paymentModal)
      .should('not.be.visible')
  })

  it('should edit payment', () => {
    cy.get(fixture.selector.paymentEditButton)
      .click()
      .get(fixture.selector.paymentModal)
      .contains('Editar pagamento')

      .get(fixture.selector.paymentModalNameInput)
      .clear()
      .wait(100)
      .type(fixture.value.nameToCreatePayment)

      .get(fixture.selector.paymentModalDateInput)
      .type(fixture.value.dateToCreatePayment)

      .get(fixture.selector.paymentModalSaveButton)
      .contains('Salvar')
      .click()

      .wait(1100)
      .get(fixture.selector.paymentModal)
      .should('not.be.visible')
  })

  it('should delete payment', () => {
    cy.get(fixture.selector.paymentDeleteButton)
      .click()
      .get(fixture.selector.deletePaymentModal)
      .contains('Excluir pagamento')

      .get(fixture.selector.deletePaymentModalSaveButton)
      .contains('Salvar')
      .click()

      .wait(1100)
      .get(fixture.selector.deletePaymentModal)
      .should('not.be.visible')
  })

  it('should open profile details', () => {
    cy.get(fixture.selector.headerDropdown)
      .click()
      .get(fixture.selector.headerDropdownProfileOption)
      .click()
      .wait(200)

      .get(fixture.selector.profileDetail)
      .should('be.visible')

      .get(fixture.selector.profileName)
      .contains('Hugo Albrecht')

      .get(fixture.selector.profileEmail)
      .contains(fixture.value.email)
  })

  it('should logout', () => {
    cy.get(fixture.selector.headerDropdown)
      .click()
      .get(fixture.selector.headerDropdownLogoutOption)
      .click()
      .wait(200)

      .location('href', { timeout: Cypress.env('default_timeout_pageload') })
      .should('contain', '/auth/login')
  })

  it('should use advanced search', () => {
    cy.get(fixture.selector.advancedSearchButton)
      .click()

      .get(fixture.selector.advancedSearchModal)
      .should('be.visible')
      .should('contain', 'Pesquisa avançada')

      .get(fixture.selector.advancedSearchModalTitleInput)
      .type(fixture.value.titleToCreatePayment)

      .get(fixture.selector.advancedSearchModalSaveButton)
      .contains('Pesquisar')
      .click()

      .wait(1100)
      .get(fixture.selector.advancedSearchModal)
      .should('not.be.visible')

      .get(fixture.selector.removeAdvancedFiltersButton)
      .should('be.visible')

      .get(fixture.selector.removeAdvancedFiltersButton)
      .click()

      .wait(200)
      .get(fixture.selector.removeAdvancedFiltersButton)
      .should('not.exist')
  })
})

function visitAndDoLogin(fixture: PayFriendsFixture, url: string) {
  cy.visit(url)
    .location('href', { timeout: Cypress.env('default_timeout_pageload') })
    .should('contain', '/auth/login')

    .get(fixture.selector.loginWelcome)
    .contains('Bem vindo de volta')
    .get(fixture.selector.loginEmailInput)
    .type(fixture.value.email)

    .get(fixture.selector.loginPasswordInput)
    .type(fixture.value.password)

    .get(fixture.selector.loginButton)
    .contains('ENTRAR')
    .click()

    .location('href', { timeout: Cypress.env('default_timeout_pageload') })
    .should('contain', '/payments/my-payments')
}
