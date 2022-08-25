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
    cy.get('input[name="fullName"]').type(user.fullName)
    cy.get('input[name="username"]').type(user.username)
    cy.get('input[name="personalEmail"]').type(user.personalEmail)
    cy.get('input[name="companyDesignation"]').type(user.companyDesignation)
    cy.get('select[name="companyType"]').type(user.companyType)
    cy.get('input[name="companyEmail"]').type(user.companyEmail)
    cy.get('input[name="loanCount"]').type(user.loanCount)
    cy.get('input[name="numberOfCustomers"]').type(user.numberOfCustomers)
    cy.get('input[name="location"]').type(user.location)
    cy.get('input[name="password"]').type(user.password)
    cy.get('input[name="confirmPassword"]').type(user.confirmPassword)
    cy.get('#registerSubmitButton').click()
})