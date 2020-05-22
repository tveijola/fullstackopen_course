import React from 'react'

const Number = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.num}</td>
    </tr>
  )
}

const Book = (props) => {
  return (
    <div>
      <table>
        <tbody>
          {props.persons.map(person =>
            <Number
              key={person.id}
              name={person.name}
              num={person.number} />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Book