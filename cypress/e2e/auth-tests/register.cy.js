let user = {
    username: "testuser",
    personalEmail: "test@email.com",
    companyEmail: "test@company.com",
    companyDesignation: "2",
    loanCount: 2,
    location: "Nairobi",
    numberOfCustomers: 2,
    password: "Password@123",
    confirmPassword: "Password@123",
    fullName: "Test User",
    companyType: "Company type",
};

describe('Register', () => {
    it('tests register page', () => {
        cy.visit('http://localhost:3000/auth/register')
        cy.location('pathname').should('eq', '/auth/register')
        cy.register(user);
        cy.location('pathname').should('eq', '/auth/register')
    })
})