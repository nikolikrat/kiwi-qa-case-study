import { passengerData } from "./data"

export const addPassengers = (value) => {
    for (let i = 0; i < value; i++) {
        cy.getDataTest('ReservationPassengers-addButton')
            .click({ force: true })
    }
}

export const setPassengerInsurance = (indexOfPassenger, typeOfInsurance) => {
    cy.getDataTest('ReservationPassenger')
        .eq(indexOfPassenger)
        .then( passengerDetails => {
            cy.wrap(passengerDetails)
                .findDataTest('ReservationPassengerInsurance-content-insurance-type')
                .contains(typeOfInsurance)
                .click({ force: true })
            cy.wrap(passengerDetails)
                .findDataTest('ReservationPassengerInsurance-content')
                .should('contain', typeOfInsurance)
                .and('contain', 'successfully added')
        })
}

export const setPassengerInsuranceViaCaT = (indexOfPassenger, typeOfInsurance) => {
    cy.getDataTest('ReservationPassenger')
        .eq(indexOfPassenger)
        .then( passengerDetails => {
            cy.wrap(passengerDetails)
                .findDataTest('ReservationPassengerInsurance-head-infoButton')
                .click({ force: true })
            cy.get('.CommonInsurance')
                .findDataTest(`${typeOfInsurance}-modalButton`).first()
                .click()
            cy.wrap(passengerDetails)
                .findDataTest('ReservationPassengerInsurance-content')
                .should('contain', typeOfInsurance.charAt(0).toUpperCase()+typeOfInsurance.slice(1))
                .and('contain', 'successfully added')
    }
)}

export const setPassengerNoInsurance = (indexOfPassenger) => {
    cy.getDataTest('ReservationPassenger')
        .eq(indexOfPassenger)
        .then( passengerDetails => {
            cy.wrap(passengerDetails)
                .findDataTest('ReservationPassengerInsurance-content-insurance-type')
                .contains('No insurance')
                .then( noInsuranceRadio => {
                    cy.wrap(noInsuranceRadio).click({ force: true })
                    cy.wrap(noInsuranceRadio).find('input').invoke('prop', 'checked').should('equal', true)
            })
    })
}

export const prefillPassengerDetails = ( indexOfPassenger ) => {
    cy.getDataTest('ReservationPassenger')
        .eq(indexOfPassenger)
        .then( passengerDetails => {
            cy.wrap(passengerDetails)
                .findNameTest('firstname').clear().type(passengerData.firstName)
            cy.wrap(passengerDetails)
                .findNameTest('lastname').clear().type(passengerData.lastName)
            cy.wrap(passengerDetails)
                .findDataTest('ReservationPassenger-nationality').select(passengerData.nationality)
            cy.wrap(passengerDetails)
                .findNameTest('title').select(passengerData.title)
            cy.wrap(passengerDetails)
                .findNameTest('birthDay').clear().type(passengerData.birthDay)
            cy.wrap(passengerDetails)
                .findNameTest('birthMonth').select(passengerData.birthMonth)
            cy.wrap(passengerDetails)
                .findNameTest('birthYear').type(passengerData.birthYear)
    })
}

// PRECONDITION: NEED PREFFILLED PASSENGER DETAILS
export const setPassengerInsuranceForAll = (numberOfPassengers, typeOfInsurance) => {
    cy.getDataTest('ReservationPassengerInsurance-head-infoButton').eq(0).click({ force: true })
    cy.get('.CommonInsurance').findDataTest(`${typeOfInsurance}-modalButton`).siblings('button').contains('Add for all passengers').click()
    cy.getDataTest('ReservationBill-box').should('contain', 'Travel insurance').and('contain', numberOfPassengers+1)
}

export const changeInsurance = (indexOfPassenger) => {
    cy.getDataTest('ReservationPassenger')
        .eq(indexOfPassenger)
        .findDataTest('ReservationPassengerInsurance-content')
        .find('a')
        .should('contain', 'Change')
        .click( {force: true} )
}