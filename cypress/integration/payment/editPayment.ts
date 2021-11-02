/// <reference types="cypress" />

context('Edit payments', () => {
    before(() => {
        localStorage.setItem('userId', '1');
        localStorage.setItem('name', 'usuario');
        cy.visit('http://localhost:4200/pagamentos');
    });

    it('Click in button to open modal for edit payment', () => {
        cy.get('#edit').click();
        cy.get('#user').clear().type('novo usuario');
        cy.get('#value').clear().type('111,2');
        cy.get('#date').click().then(x => {
            cy.get('.mat-focus-indicator').contains('25').click();
        });
        cy.get('#title').clear().type('Professor');
        cy.get('#save').click();
    });
});
