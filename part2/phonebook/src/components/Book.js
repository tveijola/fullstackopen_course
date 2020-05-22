import React from 'react'

const Number = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.num}</td>
      <td>
        <button onClick={props.del}>delete</button>
      </td>
    </tr>
  )
}

const Book = (props) => {
  return (
    <div>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {props.persons.map(person =>
            <Number
              key={person.id}
              name={person.name}
              num={person.number}
              del={() => props.del(person.id)} />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Book