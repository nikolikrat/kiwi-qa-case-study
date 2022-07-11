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

Cypress.Commands.add('getDataTest', (value) => { 
    return cy.get(`[data-test="${value}"]`);
 })

 Cypress.Commands.add('findDataTest', {prevSubject: true } ,(subject, value) => { 
    return cy.wrap(subject).find(`[data-test="${value}"]`);
 })

 Cypress.Commands.add('findNameTest', {prevSubject: true } ,(subject, value) => { 
   return cy.wrap(subject).find(`[name="${value}"]`)
})

Cypress.Commands.add('visitBookingPage', () => {
   return cy.request({method: 'GET', url: 'https://api.skypicker.com/flights?partner=cypress&fly_from=BTS&fly_to=BER'})
            .its('body')
            .then((res) => { 
               const bookingToken = res.data[0].booking_token;
               cy.visit(`https://booking-book-2712-wq9isr.fe-cloudrun.kiwi.com//booking?token=${bookingToken}`)
            })
})

Cypress.Commands.add('closeCookiesModal', () => {
   return cy.getDataTest('CloseContainer')
            .findDataTest('ModalCloseButton')
            .click({ force: true })
})