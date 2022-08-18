describe('Login', () => {
    it('tests login page', () => {
        cy.visit('http://localhost:3000/auth')
        cy.location('pathname').should('eq', '/auth/login')
        cy.get('input[name="username"]').type('testuser')
        cy.get('input[name="password"]').type('Password@123')
        cy.get('#submitBtn').click()
        cy.location('pathname').should('eq', '/cst/dashboard')
    })
})