/// <reference types="cypress" />

import { INSURANCE_TYPE, INSURANCE_TYPE_SELECTOR_KEY } from "../support/helpers/constants";
import {    addPassengers, 
            setPassengerInsurance,
            setPassengerNoInsurance,
            setPassengerInsuranceForAll,
            changeInsurance,
            prefillPassengerDetails,
            setPassengerInsuranceViaCaT
        } from "../support/helpers/travel-insurance";

describe('travel insurance test set', () => {
    beforeEach('open kiwi booking page and close cookies modal', () => {
        cy.visitBookingPage()
        cy.closeCookiesModal()
    }) 
    it('add Travel Plus to primary passenger', () => {
        setPassengerInsurance(0, INSURANCE_TYPE.TravelPlus)
    })
    it('add Travel Basic for primary passenger', () => {
        setPassengerInsurance(0, INSURANCE_TYPE.TravelBasic)
    })
    it('add No Insurance for primary passenger', () => {
        setPassengerNoInsurance(0)
    })
    it('set Travel Plus to primary ', () => {
        setPassengerInsuranceViaCaT(0, INSURANCE_TYPE_SELECTOR_KEY.TravelPlus)
        addPassengers(1)
        setPassengerInsuranceViaCaT(1, INSURANCE_TYPE_SELECTOR_KEY.TravelBasic)
    })
    it('add Travel Plus for primary passenger, add secondary passenger and add Travel Basic for second passenger', () => {
        setPassengerInsurance(0, INSURANCE_TYPE.TravelPlus)
        addPassengers(1)
        setPassengerInsurance(1, INSURANCE_TYPE.TravelBasic)
        addPassengers(1)
        prefillPassengerDetails(0)
        setPassengerNoInsurance(2)
    })
    it('add two passengers, prefill their personal details and add type of insurance to all via Comparison and terms', () => {
        prefillPassengerDetails(0)
        addPassengers(1)
        prefillPassengerDetails(1)
        addPassengers(1)
        prefillPassengerDetails(2)
        setPassengerInsuranceForAll(2, INSURANCE_TYPE_SELECTOR_KEY.TravelBasic)
    })
    it('add second passenger, prefill personal details and add type of insurance to all via Comparison and terms', () => {
        prefillPassengerDetails(0)
        addPassengers(1)
        prefillPassengerDetails(1)
        addPassengers(1)
        prefillPassengerDetails(2)
        setPassengerInsuranceForAll(2, INSURANCE_TYPE_SELECTOR_KEY.TravelPlus)
    })
    it('add Travel Plus, then change it to Travel Basic, and then change it to No insurance', () => {
        setPassengerInsurance(0, INSURANCE_TYPE.TravelPlus)
        changeInsurance(0)
        setPassengerInsurance(0, INSURANCE_TYPE.TravelBasic)
        changeInsurance(0)
        setPassengerNoInsurance(0)
    })
    it('prefill passenger details, add passenger, set insurance, change insurance to no insurance and set insurence for all passengers', () => {
        prefillPassengerDetails(0)
        addPassengers(1)
        prefillPassengerDetails(1)
        setPassengerInsurance(0, INSURANCE_TYPE.TravelPlus)
        setPassengerInsurance(1, INSURANCE_TYPE.TravelBasic)
        changeInsurance(0)
        setPassengerNoInsurance(0)
        setPassengerNoInsurance(1)
        setPassengerInsurance(1, INSURANCE_TYPE.TravelPlus)
        setPassengerInsuranceForAll(2, INSURANCE_TYPE_SELECTOR_KEY.TravelBasic)
    })
})
