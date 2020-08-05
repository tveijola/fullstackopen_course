
import React, { useState } from 'react'
import { EDIT_BIRTHYEAR } from '../queries'
import { useMutation } from '@apollo/client'
import Select from 'react-select'

const Authors = (props) => {

  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [born, setBorn] = useState('')

  const [setAuthorBirthyear] = useMutation(EDIT_BIRTHYEAR)

  if (!props.show) {
    return null
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

  const options = props.authors.map(author => {
    return {
      value: author,
      label: author.name
    }
  })

  const addBookForm = () => {
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
          {props.authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {props.token ? addBookForm() : null}
    </div>
  )
}

export default Authors
