describe(``, () => {
  it('test', () => {
    cy.visit('https://www.b2btalks.de/#')
    cy.get('a[href*="impressum"]:visible')
      .as('link')
      .its('length')
      .should('equal', 1)
    cy.get('@link')
      .should('have.attr', 'href')
      .then(href => {
        cy.request('https://www.b2btalks.de/#' + href)
          .its('status')
          .should('be.equal', 200)
      })
    cy.document().then(a => {
      cy.getAllCookies()
      cy.getAllLocalStorage()
      console.log(a.cookie)
      let doc = Cypress.$(a)
      cy.log(doc, doc.height(), doc.width())
    })
    // cy.get('@link').click({ force: true })
  })
  it('second impresssum', () => {
    cy.visit('https://nevercodealone.de/de')
    cy.get('a[href*="impressum"]:visible')
      .as('link')
      .its('length')
      .should('equal', 1)
    cy.get('@link')
      .should('have.attr', 'href')
      .then(href => {
        cy.request(href).its('status').should('be.equal', 200)
      })
    cy.get('@link').click({ force: true })
  })
  it('another impressum', () => {
    cy.visit('https://www.qi-digital.de/')
    cy.get('a[href*="impressum"]:visible')
      .as('link')
      .its('length')
      .should('equal', 1)
  })
})
