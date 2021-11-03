/// <reference types="cypress" />

context('Add payments', () => {
    before(() => {
        localStorage.setItem('userId', '1');
        localStorage.setItem('name', 'usuario');
        cy.visit('http://localhost:4200/pagamentos');
    });

    it('Click in button to open modal for new payment', () => {
        cy.get('#addPayment').click();
        cy.get('#user').type('novo usuario');
        cy.get('#value').type('111,2');
        cy.get('#date').click().then(x => {
            cy.get('.mat-focus-indicator').contains('24').click();
        });
        cy.get('#title').type('Professor');
        cy.get('#save').click();
    });
});
