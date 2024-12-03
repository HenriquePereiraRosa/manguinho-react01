import { faker } from '@faker-js/faker'

describe('Login', () => {
  beforeEach(() => {
    visitLogin()
  })

  it('Should do Load with correct initial State', () => {
    cy.get('[type="email"]').should('have.attr', 'placeholder', 'Type your email')
    cy.get('[type="password"]').should('have.attr', 'placeholder', 'Type your password')
    cy.get('[data-testid="btn-submit"]').should('have.attr', 'disabled', 'disabled')
    cy.get('[data-testid="error-container"]').should('not.have.descendants')
  })

  it('Should do present error state if form is invalid', () => {
    cy.get('[type="email"]').type(faker.random.word())
    cy.get('[type="email"]')
      .should('have.attr', 'error-message')
      .should('not.be.null')
    cy.get('[type="email"]')
      .find('svg path')
      .should('not.be.null')

    cy.get('[type="password"]').type(faker.random.alphaNumeric(3))
    cy.get('[type="password"]')
      .should('have.attr', 'error-message')
      .should('not.be.null')
    cy.get('[type="password"]')
      .find('svg path')
      .should('not.be.null')

    cy.get('[data-testid="btn-submit"]').should('have.attr', 'disabled', 'disabled')
    cy.get('[data-testid="error-container"]').should('not.have.descendants')
  })
})

function visitLogin(): void {
  cy.visit('login')

  cy.url().should('include', '/login')
}
