const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/Author')
require('dotenv').config()

mongoose.set('useFindAndModify', false)
console.log('Connecting to', process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      return Book.find({})
    },
    allAuthors: () => {
      return Author.find({})
    }
  },
  Author: {
    bookCount: (root) => {
      return books.reduce((bookCount, currentBook) => (
        (currentBook.author === root.name)
          ? bookCount + 1
          : bookCount
      ), 0)
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        await author.save()
      }
      const book = new Book({ ...args, author: author })
      return book.save()
    },
    editAuthor: (root, args) => {
      return authors.find(a => {
        if (a.name === args.name) {
          a.born = args.setBornTo
          return true
        }
        return false
      })
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})