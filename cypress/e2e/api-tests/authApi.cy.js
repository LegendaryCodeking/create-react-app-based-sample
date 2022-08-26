/* describe('Auth api login test', () => {
    it('tests login api', () => {
        cy.request('POST', Cypress.env('login_url'), {
            username: 'testuser',
            password: 'Password@123'
        }).then(
            (response) => {
                // response.body is automatically serialized into JSON
                expect(response.body).to.have.property('status', 'success') // true
            }
        )
    })
})

describe('Auth api register test', () => {
    it('tests register api', () => {
        cy.request('POST', Cypress.env('register_url'), {
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
        }).then(
            (response) => {
                // response.body is automatically serialized into JSON
                expect(response.body).to.have.property('status', 'failed') // true
            }
        )
    })
}) */