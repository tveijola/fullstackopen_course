import React, { useState } from 'react'
import Book from './components/Book'

const Filter = ({ filter, filterShown }) => (
  <div>
    Filter shown with:
    <input
      value={filter}
      onChange={filterShown} />
  </div>
)

const PersonForm = ({ newName, newNum, handleNameChange, handleNumChange, addPerson }) => (
  <div><h3>Add a new entry</h3>
    <form onSubmit={addPerson}>
      <div>Name:   <input value={newName} onChange={handleNameChange} /></div>
      <div>Number: <input value={newNum} onChange={handleNumChange} /></div>
      <div><button type="submit">add</button></div>
    </form>
  </div>
)

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', num: '040-123456' },
    { name: 'Ada Lovelace', num: '39-44-5323523' },
    { name: 'Dan Abramov', num: '12-43-234345' },
    { name: 'Mary Poppendieck', num: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('event target:', event.target)
    console.log('addPerson:', newName)
    const duplicate = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    if (duplicate) {
      console.log('DUPLICATE FOUND')
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      const newPerson = {
        name: newName,
        num: newNum
      }
      const copy = [...persons].concat(newPerson)
      console.log('copy:', copy)
      setPersons(copy)
      setNewName('')
      setNewNum('')
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumChange = (event) => setNewNum(event.target.value)
  const filterShown = (event) => setFilter(event.target.value)

  const filteredPersons = filter.length === 0
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterShown={filterShown} />
      <PersonForm
        newName={newName} handleNameChange={handleNameChange}
        newNum={newNum} handleNumChange={handleNumChange} addPerson={addPerson} />
      <Book persons={filteredPersons} />
    </div>
  )
}

export default App