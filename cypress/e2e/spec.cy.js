import BasePage from '../pageobjects/BasePage'
import constants from '../fixtures/constants'
describe('Performs search of the city on the home page of "https://openweathermap.org/"', () => {
  let currentTempArr = []
  let apiTemp = []
  let interceptedId = ''
  beforeEach(() => {
    BasePage.open()
  })
  it.only(`intercepts request to api`, () => {
    cy.intercept('GET', 'https://api.openweathermap.org/data/2.5/').as('req')
    BasePage.open()
    BasePage.searchCityMainSearch('Marbella')
    cy.wait('@req', { timeout: 10000 })
      .its('response')
      .then(response => {
        cy.log(response.body)
      })
  })
  constants.cities.forEach((el, i) => {
    it(`Searches ${el} using the main search input`, () => {
      BasePage.searchCityMainSearch(el)
      cy.get(BasePage.searchDropdownMenu).should('be.visible')
      cy.get(BasePage.searchResults).should('have.length.above', 1)
      cy.contains(el).click()
      cy.contains(BasePage.cityHeader, el).should('be.visible')
      cy.get(BasePage.map).should('be.visible')
      cy.get(BasePage.currentTemp)
        .invoke('text')
        .then(text => {
          currentTempArr.push(parseInt(text))
        })
      let timeNow = (new Date().getHours() + 24) % 12 || 12
      BasePage.checkHour(timeNow)
    })
    it(`Searches ${el} using the upper search input and compares temperature with the main search results`, () => {
      BasePage.searchCityUpperSearch(el)
      cy.contains(el).click()
      cy.get(BasePage.currentTemp)
        .invoke('text')
        .then(text => {
          expect(parseInt(text)).to.equal(currentTempArr[i])
        })
      cy.get(BasePage.mapLink)
        .then(el => {
          el.attr('target', '_self')
        })
        .click()
      cy.get(BasePage.zoomInBtn).click()
      cy.wait(1000)
      cy.get(BasePage.zoomInBtn).click()
      cy.contains(el)
        .parent()
        .contains('span', currentTempArr[i].toString())
        .should('exist')
    })
  })
  constants.requests.forEach((req, i) => {
    it(`Send GET request for ${constants.cities[i]} and compares it with the temperature got with UI check`, () => {
      cy.api(req).then(response => {
        cy.log(response.body)
        apiTemp.push(parseInt(response.body.main.temp))
        expect(currentTempArr[i]).to.equal(apiTemp[i])
      })
    })
  })
})
