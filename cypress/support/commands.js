Cypress.Commands.overwrite('log', (log, message, ...args) => {
  // print the to Cypress Command Log
  // to preserve the existing functionality
  log(message, ...args)
  // send the formatted message down to the Node
  // callback in the cypress.config.js to be printed to the terminal
  cy.task('print', [message, ...args].join(', '), { log: false })
})

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import '@cypress-audit/lighthouse/commands'

import { faker } from '@faker-js/faker'
import constants from '../fixtures/constants_testautomation'
const firstName = faker.name.firstName(constants.gender)
const lastName = faker.name.lastName(constants.gender)
const companyName = faker.company.name()
const email = faker.internet.email()
const month = faker.date.month()
const year = faker.date.birthdate().getFullYear().toString()
const day = faker.date.birthdate().getDate()
const password = faker.internet.password()
Cypress.Commands.add('registerNewUser', () => {
  cy.log(day, month, year)
  cy.contains('a', constants.headerRegister).click()
  cy.get('h1').should('have.text', constants.headerRegister)
  cy.get(`span.${constants.gender} input`).check()
  cy.get('#FirstName').type(firstName)
  cy.get('#LastName').type(lastName)
  cy.get('[name="DateOfBirthDay"]').select(day)
  cy.get('[name="DateOfBirthMonth"]').select(month)
  cy.get('[name="DateOfBirthYear"]').select(year)
  cy.get('[type="email"]').eq(0).type(email)
  cy.get('#Company').type(companyName)
  if (constants.newsletter) {
    cy.get('#Newsletter').check()
  }
  cy.get('#Password').type(password)
  cy.get('#ConfirmPassword').type(password)
  cy.get('#register-button').click()
  cy.get('div.result').should('have.text', constants.successRegistration)
  cy.contains('Continue').click()
})
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
