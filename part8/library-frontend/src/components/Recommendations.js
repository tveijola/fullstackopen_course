import React from 'react'

const Recommendations = (props) => {

  if (!props.show) {
    return null
  }

  const filteredBooks = props.books.filter(book => {
    return book.genres.some(genre => genre === props.user.favoriteGenre)
  })

  return (
    <div>
      <h2>Recommendations</h2>
      <div>
        books in your favorite genre <b>{props.user.favoriteGenre}</b>
      </div>
      <br />
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
    </div>
  )
}

export default Recommendations