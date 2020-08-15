import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK, ALL_AUTHORS, ALL_BOOKS, GENRE_BOOKS } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    update: (store, response) => {
      // Try-catch blogs needed in case query not in cache
      try {
        const authorsInStore = store.readQuery({ query: ALL_AUTHORS })
        store.writeQuery({
          query: ALL_AUTHORS,
          data: {
            ...authorsInStore,
            allAuthors: [...authorsInStore.allAuthors, response.data.addBook]
          }
        })
      } catch (error) {
        console.log('tried reading non-existing query from cache')
      }

      try {
        const booksInStore = store.readQuery({ query: ALL_BOOKS })
        store.writeQuery({
          query: ALL_BOOKS,
          data: {
            ...booksInStore,
            allBooks: [...booksInStore.allBooks, response.data.addBook]
          }
        })
      } catch (error) {
        console.log('tried reading non-existing query from cache')
      }

      // Try updating cache for each genre
      response.data.addBook.genres.forEach(genre => {
        try {
          const genreBooksInStore = store.readQuery({
            query: GENRE_BOOKS,
            variables: { genre: genre }
          })
          store.writeQuery({
            query: GENRE_BOOKS,
            variables: { genre: genre },
            data: {
              ...genreBooksInStore,
              allBooks: [...genreBooksInStore.allBooks, response.data.addBook]
            }
          })
        } catch (error) {
          console.log('tried reading non-existing query from cache')
        }
      })
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    createBook({ variables: { title, author, published: parseInt(published), genres } })
    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook