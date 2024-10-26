import constants from '../fixtures/constants_testautomation'
const thresholds = {
  performance: 50,
  accessibility: 90,
  'first-contentful-paint': 2500,
  // 'largest-contentful-paint': 3000,
  // 'cumulative-layout-shift': 0.1,
  // 'total-blocking-time': 500,
  'best-practices': 80,
  seo: 80
}
const opts = {
  formFactor: 'desktop',
  screenEmulation: {
    mobile: false,
    disable: true,
    width: Cypress.config('viewportWidth'),
    height: Cypress.config('viewportHeight'),
    deviceScaleRatio: 1
  }
}
describe('Successfully buy computer on https://demo.nopcommerce.com/', () => {
  beforeEach(() => {
    cy.visit(constants.url)
  })
  it('Banner slides are visible', () => {
    cy.lighthouse(thresholds, opts)
    cy.get('#nivo-slider img[src*="banner_01"]')
      .should('have.length', 2)
      .and('be.visible')
    cy.get('#nivo-slider img[src*="banner_02"]')
      .should('have.length', 2)
      .and('be.visible')
  })
  it('Main menu inner elements are visible when hover on', () => {
    for (let i = 0; i < 3; i++) {
      cy.get('.top-menu.notmobile>li')
        .eq(i)
        .realHover()
        .find('.sublist.first-level li')
        .each(el => {
          expect(el).to.be.visible
        })
    }
  })
  it(`register new user account`, () => {
    cy.registerNewUser()
  })
  it(`Change currency to EUR`, () => {
    cy.get('#customerCurrency').select('Euro')
  })
})
