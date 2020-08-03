
import React, { useState } from 'react'
import { EDIT_BIRTHYEAR } from '../queries'
import { useMutation } from '@apollo/client'

const Authors = (props) => {

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [setAuthorBirthyear] = useMutation(EDIT_BIRTHYEAR)

  if (!props.show) {
    return null
  }

  const setBirthyear = (event) => {
    event.preventDefault()
    setAuthorBirthyear({ variables: { name, setBornTo: parseInt(born)}})
    setName('')
    setBorn('')
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

      <h3>Set birthyear</h3>
      <form onSubmit={setBirthyear}>
        <div>
          name
          <input value={name}
            onChange={({ target }) => setName(target.value)} />
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

export default Authors
