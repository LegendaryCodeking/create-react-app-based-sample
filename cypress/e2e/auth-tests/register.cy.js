let user = {
    username: "testuser",
    email: 'testuser@gmail.com',
    company_email: "testco@co.com",
    company_designation: "Tester",
    company_location: "Test Location",
    total_customers: 0,
    password: "Password@123",
    confirm_password: "Password@123",
    company_name: "Test Company",
    first_name: "Test",
    last_name: "User",
};

let userObject = {
    username: "testuser",
    email: 'testuser@gmail.com',
    company_email: "testco@co.com",
    company_designation: "Tester",
    company_location: "Test Location",
    total_customers: 0,
    password: "Password@123",
    company_name: "Test Company",
    first_name: "Test",
    last_name: "User",
};

/* describe('Register', () => {
    it('tests register page', () => {
        cy.visit('http://localhost:3000/auth/register')
        cy.location('pathname').should('eq', '/auth/register')
        cy.register(user);
        cy.location('pathname').should('eq', '/auth/login')
    })
}) */


/* describe('USER REGISTRATION CHECK', () => {
    it('Performs a healthcheck of register API', () => {
        cy.request('POST', Cypress.env('register_url'), userObject).then(
            (response) => {
                // response.body is automatically serialized into JSON
                expect(response.body).to.have.property('status', "failed") // true
            }
        )
    })
}) */