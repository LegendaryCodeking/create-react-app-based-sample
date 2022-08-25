describe('Login', () => {
    it('tests login page', () => {
        cy.visit('http://localhost:3000/auth')
        cy.location('pathname').should('eq', '/auth/login')
        cy.login('testuser', 'Password@123');
        cy.location('pathname').should('eq', '/cst/dashboard')
    })
})