import BasePage from '../pageobjects/BasePage'
import constants from '../fixtures/constants_openweather'
describe('Performs search of the city on the home page of "https://openweathermap.org/"', () => {
  let currentTempArr = []
  let apiTemp = []
  let interceptedId = ''
  beforeEach(() => {
    BasePage.open()
  })
  it(`Make request with api key from UI city search request (bypass signup and retrieve appid)`, () => {
    cy.intercept('GET', 'data/2.5/*').as('req')
    BasePage.open()
    BasePage.searchCityMainSearch('Marbella')
    cy.wait('@req')
      .then(interception => {
        interceptedId += interception.request.url.match(/appid=.*/g)[0].slice(6)
        console.log(interceptedId)
        return interceptedId
      })
      .then(id => {
        cy.api({
          method: 'GET',
          url: 'http://openweathermap.org/data/2.5/forecast',
          qs: {
            appid: id,
            id: 2517115,
            units: 'metric'
          },
          failOnStatusCode: false
        }).then(response => {
          expect(response.status).to.eq(200)
        })
      })
  })
  constants.citiesES.forEach((el, i) => {
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
          currentTempArr.push(text)
        })
      let timeNow = (new Date().getHours() + 24) % 12 || 12
      BasePage.checkHour(timeNow)
    })
    it(`Searches ${el} using the upper search input and compares temperature with the main search results and the temperature on the map`, () => {
      BasePage.searchCityUpperSearch(el)
      cy.contains(el).click()
      cy.get(BasePage.currentTemp)
        .invoke('text')
        .then(text => {
          expect(text).to.equal(currentTempArr[i])
        })
      cy.get(BasePage.mapLink)
        .then(el => {
          el.attr('target', '_self')
        })
        .click()
      cy.get(BasePage.zoomInBtn).click()
      cy.wait(1000)
      cy.get(BasePage.zoomInBtn).click()
      cy.contains(constants.citiesEN[i])
        .parent()
        .children('.city-weather')
        .should('contain.text', currentTempArr[i].slice(0, 2))
    })
  })
  constants.requests.forEach((req, i) => {
    it(`Send GET request for ${constants.citiesES[i]} and compares it with the temperature got with UI check`, () => {
      cy.api(req).then(response => {
        cy.log(response.body)
        apiTemp.push(response.body.main.temp)
        expect(parseInt(currentTempArr[i])).to.equal(parseInt(apiTemp[i]))
      })
    })
  })
})
