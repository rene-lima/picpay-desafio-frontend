/// <reference types="cypress" />

context('Search', () => {
    before(() => {
        localStorage.setItem('userId', '1');
        localStorage.setItem('name', 'usuario');
        cy.visit('http://localhost:4200/pagamentos');
    });
    it('Searching user for name', () => {
        cy.wait(1000);
        cy.get('#search').type('babe').type('{enter}');
        cy.wait(3000);
        cy.get('#search').clear().type('{enter}');
    });
});
