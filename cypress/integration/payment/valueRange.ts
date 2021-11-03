/// <reference types="cypress" />

context('Value range', () => {
    before(() => {
        localStorage.setItem('userId', '1');
        localStorage.setItem('name', 'usuario');
        cy.visit('http://localhost:4200/pagamentos');
    });
    it('Get tasks with a range', () => {
        cy.get('#filterDateRange').click();
        cy.get('#valueStart').type('10');
        cy.get('#valueEnd').type('1000');
        cy.get('#searchValue').click();
        cy.wait(1000);
        cy.get('#refresh').click();
    });
});