describe('Login', () => {
  it('Should do Load with correct initial State...', () => {
    cy.visit('login')

    cy.url().should('include', '/login')
  })
})
