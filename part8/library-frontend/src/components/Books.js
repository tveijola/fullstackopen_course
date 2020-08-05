import React, { useState } from 'react'

const Books = (props) => {

  const [filterGenre, setFilterGenre] = useState(null)

  if (!props.show) {
    return null
  }

  const allGenres = []
  props.books.forEach(book => {
    book.genres.forEach(genre => {
      if (!allGenres.includes(genre)) {
        allGenres.push(genre)
      }
    })
  })

  const filteredBooks = filterGenre
    ? props.books.filter(book => {
      return book.genres.some(genre => filterGenre.includes(genre))
    })
    : props.books

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