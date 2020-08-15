import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommendations = (props) => {

  const [recommended, setRecommended] = useState(null)
  const [getRecommended, result] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (result.data) {
      setRecommended(result.data.allBooks)
    }
  }, [result])

  if (!props.show || !props.user) {
    return null
  }
  if (!result.called) {
    getRecommended({ variables: { genre: props.user.favoriteGenre } })
  }
  if (!recommended) {
    return <div>loading...</div>
  }

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
          {recommended.map(a =>
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