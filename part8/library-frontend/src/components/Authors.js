
import React, { useState, useEffect } from 'react'
import { EDIT_BIRTHYEAR, ALL_AUTHORS } from '../queries'
import { useLazyQuery, useMutation } from '@apollo/client'
import Select from 'react-select'

const Authors = (props) => {

  const [authors, setAuthors] = useState(null)
  const [born, setBorn] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  
  const [getAuthors, result] = useLazyQuery(ALL_AUTHORS)
  const [setAuthorBirthyear] = useMutation(EDIT_BIRTHYEAR)

  useEffect(() => {
    if (result.data) {
      setAuthors(result.data.allAuthors)
    }
  }, [result])

  if (!props.show) {
    return null
  }

  if (!result.called) {
    getAuthors()
  }

  if (!authors) {
    return <div>loading...</div>
  }

  const setBirthyear = (event) => {
    event.preventDefault()
    setAuthorBirthyear({
      variables: {
        name: selectedAuthor.value.name,
        setBornTo: parseInt(born)
      }
    })
    setSelectedAuthor(null)
    setBorn('')
  }

  const options = authors.map(author => {
    return {
      value: author,
      label: author.name
    }
  })

  const modifyBornForm = () => {
    return (
      <div>
        <h3>Set birthyear</h3>
        <form onSubmit={setBirthyear}>
          <div>
            name
          <Select
              value={selectedAuthor}
              options={options}
              onChange={(selectedAuthor) => setSelectedAuthor(selectedAuthor)} />
          </div>
          <div>
            born
          <input value={born}
              onChange={({ target }) => setBorn(target.value)} />
          </div>
          <button type='submit'>
            update author
        </button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {props.token ? modifyBornForm() : null}
    </div>
  )
}

export default Authors
