describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const testuser = {
      name: 'Super User',
      username: 'root',
      password: 'root'
    }
    cy.request('POST', 'http://localhost:3000/api/users', testuser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#loginUsername').type('root')
      cy.get('#loginPassword').type('root')
      cy.get('#login-button').click()
      cy.contains('Blogs')
      cy.contains('Super User Logged in')
      cy.get('#notification')
        .should('contain', 'Succesfully logged in')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })
    it('fails with wrong credentials', function () {
      cy.get('#loginUsername').type('root')
      cy.get('#loginPassword').type('wrongpass')
      cy.get('#login-button').click()
      cy.contains('Login to application')
      cy.get('#notification')
        .should('contain', 'Invalid username or password!')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#loginUsername').type('root')
      cy.get('#loginPassword').type('root')
      cy.get('#login-button').click()
    })
    it('A blog can be created', function () {
      cy.get('#toggle-blogform-visibility-button').click()
      cy.get('#titleInput').type('Title Written By Cypress')
      cy.get('#authorInput').type('Cypress Writer')
      cy.get('#urlInput').type('http://www.cypress.io/blog')
      cy.get('#create-blog-button').click()
      cy.contains('Title Written By Cypress -- Cypress Writer')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.get('#toggle-blogform-visibility-button').click()
        cy.get('#titleInput').type('Title Written By Cypress')
        cy.get('#authorInput').type('Cypress Writer')
        cy.get('#urlInput').type('http://www.cypress.io/blog')
        cy.get('#create-blog-button').click()
      })
      it('a user can like a blog', function() {
        cy.contains('Title Written By Cypress -- Cypress Writer')
          .get('.toggleDetailsButton').click()
        cy.contains('Title Written By Cypress -- Cypress Writer')
          .contains('Likes: 0')
        cy.contains('Title Written By Cypress -- Cypress Writer')
          .get('.likeButton').click()
        cy.contains('Title Written By Cypress -- Cypress Writer')
          .contains('Likes: 1')
      })
    })
  })
})