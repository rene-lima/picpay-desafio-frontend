/// <reference types="cypress" />

context('Delete payment', () => {
    before(() => {
        cy.visit('http://localhost:4200/pagamentos');
    });
})