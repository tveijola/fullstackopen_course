const testuser = {
  name: 'Super User',
  username: 'root',
  password: 'root'
}

const otheruser = {
  name: 'Regular User',
  username: 'user',
  password: 'user'
}

const testBlog = {
  title: 'First Blog By Cypress',
  author: 'Cypress Writer1',
  url: 'http://www.cypress.io/blog1'
}

const secondBlog = {
  title: 'Second Blog By Cypress',
  author: 'Cypress Writer2',
  url: 'http://www.cypress.io/blog2'
}

const thirdBlog = {
  title: 'Third Blog By Cypress',
  author: 'Cypress Writer3',
  url: 'http://www.cypress.io/blog3'
}

describe('Blog app', function () {
  beforeEach(function () {
    // Reset DB and create users
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3000/api/users', testuser)
    cy.request('POST', 'http://localhost:3000/api/users', otheruser)
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
      cy.login(testuser)
    })
    it('A blog can be created', function () {
      cy.get('#toggle-blogform-visibility-button').click()
      cy.get('#titleInput').type(testBlog.title)
      cy.get('#authorInput').type(testBlog.author)
      cy.get('#urlInput').type('http://www.cypress.io/blog')
      cy.get('#create-blog-button').click()
      cy.contains(`${testBlog.title} -- ${testBlog.author}`)
    })

    describe('and a blog exists', function () {

      const searchString = `${testBlog.title} -- ${testBlog.author}`

      beforeEach(function () {
        cy.createBlog(testBlog)
      })
      it('a user can like a blog', function () {
        cy.contains(searchString).get('.toggleDetailsButton').click()
        cy.contains(searchString).contains('Likes: 0')
        cy.contains(searchString).get('.likeButton').click()
        cy.contains(searchString).contains('Likes: 1')
      })
      it('a user can remove a blog they created', function () {
        cy.contains(searchString).get('.toggleDetailsButton').click()
        cy.contains(searchString).get('.removeButton').click()
        cy.contains(searchString).should('not.exist')
      })
      it('a user can not remove a blog they did not create', function () {
        cy.get('#logoutButton').click()
        cy.login(otheruser)
        cy.contains(searchString).get('.toggleDetailsButton').click()
        cy.contains(searchString).get('.removeButton').should('not.exist')
      })
    })

    describe('and multiple blogs exist', function () {
      beforeEach(function () {
        cy.createBlog(testBlog)
        cy.createBlog(secondBlog)
        cy.createBlog(thirdBlog)
      })
      it('the blogs are ordered by number of likes', function () {
        cy.contains(`${testBlog.title} -- ${testBlog.author}`)
          .parent()
          .get('.toggleDetailsButton')
          .click({ multiple: true })

        // Strategy for ensuring correct ordering:
        //   - click the like button a random number of times for each blog
        //      - randomness leads to variance in the order between runs
        //   - keep track of how many likes were given to each blog
        //   - sort the list of likes
        //   - expect that blogs are in the same order as the sorted list
        // Issues:
        //   - each click of like button must increment the counter (doesn't happen if server is slow)
        //   - assumes that the 'each' method iterates over the blogs in correct order (top to bottom)

        let likes = []
        cy.get('html')
          .contains(`${testBlog.title} -- ${testBlog.author}`)
          .parent()
          .get('.likeButton')
          .each($button => {
            let addLikes = Math.floor(Math.random() * 10) + 3
            for (let i = 0; i < addLikes; i++) {
              cy.wrap($button).click()
              cy.wait(50)
            }
            likes.push(addLikes)
          })
        cy.get('.blog').then(() => {
          likes = likes.sort((a, b) => b - a)
        }).each($blog => {
          cy.wrap($blog).contains(`Likes: ${likes.shift()}`)
        })
      })
    })
  })
})