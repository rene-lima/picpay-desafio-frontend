/// <reference types="cypress" />

context('Pagination', () => {
    before(() => {
        localStorage.setItem('userId', '1');
        localStorage.setItem('name', 'usuario');
        cy.visit('http://localhost:4200/pagamentos');
    });
    it('Click in arrow button to change page', () => {
        for (let i = 0; i < 5; i++) {
            cy.get('#nextPage').first().click();
            cy.wait(500);
        }
        for (let i = 0; i < 5; i++) {
            cy.get('#backPage').first().click();
            cy.wait(500);
        }
    });
    it('Click in select and change number of rows', () => {
        cy.get('#select').click()
            .then(() => {
                cy.get('.mat-option-text').contains('10').click();
                cy.wait(500);
                cy.get('#select').click();
                cy.get('.mat-option-text').contains('20').click();
                cy.wait(500);
                cy.get('#select').click();
                cy.get('.mat-option-text').contains('5').click();
            });
    });
});
