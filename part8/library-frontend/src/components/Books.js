import React, { useState, useEffect } from 'react'
import { ALL_BOOKS } from '../queries'
import { useLazyQuery } from '@apollo/client'

const Books = (props) => {

  const [filterGenre, setFilterGenre] = useState(null)
  const [books, setBooks] = useState(null)

  const [getBooks, result] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result])

  if (!props.show) {
    return null
  }

  if (!result.called) {
    getBooks()
  }

  if (!books) {
    return <div>loading...</div>
  }

  const allGenres = []
  books.forEach(book => {
    book.genres.forEach(genre => {
      if (!allGenres.includes(genre)) {
        allGenres.push(genre)
      }
    })
  })

  const filteredBooks = filterGenre
    ? books.filter(book => {
      return book.genres.some(genre => filterGenre.includes(genre))
    })
    : books

  const filterMessage = () => {
    return (
      <div>
        Showing books in genre <b>{filterGenre}</b>
        <button style={{ margin: 15 }} onClick={() => setFilterGenre(null)}>Clear filter</button>
      </div>
    )
  }

  return (
    <div>
      <h2>books</h2>
      {filterGenre ? filterMessage() : null}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <br />
      filter by
      <br />
      {allGenres.map(genre =>
        <button
          key={genre}
          onClick={() => setFilterGenre(genre)}>
          {genre}
        </button>
      )}
    </div>
  )
}

export default Books