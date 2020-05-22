import React, { useState, useEffect } from 'react'
import Book from './components/Book'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const duplicate = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    if (duplicate) {
      console.log('DUPLICATE FOUND')
      const replace = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (replace) {
        const id = persons.find(person => person.name.toLowerCase() === newName.toLowerCase()).id
        const newPerson = {
          name: newName,
          number: newNum,
          id: id
        }
        personService
          .update(newPerson.id, newPerson)
          .then(returnedPerson =>{
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            setNewName('')
            setNewNum('')
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNum,
      }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNum('')
        })
    }
  }

  const deletePerson = (id) => {
    const confirm = window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)
    if (confirm){
      personService
      .remove(id)
      .then(
        setPersons(persons.filter(person => person.id !== id))
      )
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
      <Book persons={filteredPersons} 
            del={deletePerson} />
    </div>
  )
}

export default App