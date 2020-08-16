import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name,
    born,
    bookCount,
    id
  }
}
`

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  title,
  published,
  author{
    name,
    born,
    bookCount,
    id
  },
  genres,
  id
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const GENRE_BOOKS = gql`
query ($genre: String!) {
  allBooks (
    genre: $genre
  ) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const GET_USER = gql`
query {
  me {
    username,
    favoriteGenre,
    id
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres:[String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title,
    published,
    author{
      name,
      born,
      bookCount,
      id
    },
    genres,
    id
  }
}
`

export const EDIT_BIRTHYEAR = gql`
mutation setAuthorBirthyear($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo
  ) {
    name,
    born,
    bookCount,
    id
  }
}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(
    username: $username,
    password: $password
  ) {
    value
  }
}
`

export const BOOK_ADDED = gql`
subscription {
  bookAdded {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`