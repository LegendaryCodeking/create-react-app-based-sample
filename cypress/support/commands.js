// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, password) => {
    cy.get('input[name="username"]').type(email)
    cy.get('input[name="password"]').type(password)
    cy.get('#submitBtn').click()
})

Cypress.Commands.add('register', (user) => {
    cy.get('input[name="firstName"]').type(user.first_name)
    cy.get('input[name="lastName"]').type(user.last_name)
    cy.get('input[name="userName"]').type(user.username)
    cy.get('input[name="personalEmail"]').type(user.email)
    cy.get('input[name="companyDesignation"]').type(user.company_designation)
    cy.get('input[name="companyName"]').type(user.company_name)
    cy.get('input[name="companyEmail"]').type(user.company_email)
    cy.get('input[name="location"]').type(user.company_location)
    cy.get('input[name="password"]').type(user.password)
    cy.get('input[name="confirmPassword"]').type(user.confirm_password)
    cy.get('#registerSubmitButton').click()
})