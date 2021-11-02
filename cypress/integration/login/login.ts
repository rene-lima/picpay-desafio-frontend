/// <reference types="cypress" />

context('Login', () => {
    before(() => {
        localStorage.setItem('userId', '1');
        localStorage.setItem('name', 'usuario');
        cy.visit('http://localhost:4200/');
    });
    it('Enter the application', () => {
        cy.get('#email').type('usuario@gmail.com');
        cy.get('#password').type('usuario');
        cy.get('#showPassword').click();
        cy.wait(500);
        cy.get('#showPassword').click();
        cy.get('#submit').click();
    });
});
