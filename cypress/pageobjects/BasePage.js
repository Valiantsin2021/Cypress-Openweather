/**
 * Base page class for openweather.org tests with cypress
 */
class BasePage {
  constructor() {
    this.logo = 'a.logo'
    this.menuList = '#desktop-menu ul li'
    this.registerBtn = 'a[href="https://openweathermap.org/home/sign_in"]'
    this.loginBtn = 'span.top-authoriz1'
    this.ordersBtn = '.top-see-all'
    this.upperSearchInput = '#desktop-menu [placeholder="Weather in your city"]'
    this.mainSearchInput = '[placeholder="Search city"]'
    this.searchBtn = 'button[type="submit"]'
    this.searchDropdownMenu = 'ul.search-dropdown-menu'
    this.searchResults = 'ul.search-dropdown-menu li'
    this.map = '#widget-map'
    this.timeScale = 'div.time-container div span:nth-child(2)'
    this.cityHeader = 'div h2'
    this.currentTemp = 'div.current-temp span.heading'
    this.mapLink = 'a.map-info-block'
    this.zoomInBtn = 'a[title="Zoom in"]'
  }
  /**
   * Opens the Home page of openweathermap.org
   */
  open() {
    return cy.visit(`/`)
  }
  /**
   * Performs search on the Home page for actor using upper search input and hit 'Enter' button
   * @param  {String} name - current city name
   */
  searchCityUpperSearch(name) {
    cy.get(this.upperSearchInput).type(name + '{Enter}')
    return this
  }
  /**
   * Performs search on the Home page for actor using main search input and press 'Search' button
   * @param  {String} name - current city name
   */
  searchCityMainSearch(name) {
    cy.get(this.mainSearchInput).type(name)
    cy.get(this.searchBtn).click()
    return this
  }
  /**
   * Checks if the time shown on the scale in the weather map modal corresponds to actual time
   * @param  {String} time - actual time (hours)
   */
  checkHour(time) {
    cy.get(this.timeScale)
      .invoke('text')
      .then(text => {
        let timeShown = parseInt(text)
        expect(time).to.equal(timeShown)
      })
    return this
  }
}
module.exports = new BasePage()
