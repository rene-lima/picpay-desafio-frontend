/// <reference types="cypress" />

context('Toolbar', () => {
    before(() => {
        localStorage.setItem('userId', '1');
        localStorage.setItem('name', 'usuario');
        cy.visit('http://localhost:4200/pagamentos');
    });
    it('Leaving the application', () => {
        cy.get('#imgPerson').click();
        cy.wait(500);
        cy.contains('Sair').click();
    });
});
