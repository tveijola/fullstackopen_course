import React, { useState, useEffect } from 'react'
import Book from './components/Book'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({
    message: null,
    isError: false
  })

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const notify = (message, isError) => ({ message, isError })

  const refreshPhonebook = () => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }

  const clearForms = () => {
    setNewName('')
    setNewNum('')
  }

  const clearNotification = () => {
    setNotification({
      message: null,
      isError: false
    })
  }

  const addPerson = (event) => {
    event.preventDefault()
    let replace = false
    const duplicate = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    if (duplicate) {
      console.log('DUPLICATE FOUND')
      replace = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
    }

    if (duplicate && !replace) {
      return
    }

    let promise;
    const newPerson = {
      name: newName,
      number: newNum
    }

    if (replace) {
      newPerson.id = persons.find(p => p.name.toLowerCase() === newName.toLowerCase()).id
      promise = personService
        .update(newPerson.id, newPerson)
        .then(returnedPerson => setPersons(persons.map(p => p.id !== newPerson.id ? p : returnedPerson)))
    } else {
      promise = personService
        .create(newPerson)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
    }
    
    promise.then(() => {
      const msg = (replace)
        ? `Modified ${newName}`
        : `Added ${newName}`
      setNotification(notify(msg, false))
      setTimeout(() => clearNotification(), 3000)
      clearForms()
    }).catch(error => {
      setNotification(notify(`Information of ${newName} has been deleted!`, true))
      setTimeout(() => clearNotification, 5000)
      refreshPhonebook();
    })
  }

  const deletePerson = (id) => {
    const confirm = window.confirm(`Delete ${persons.find(p => p.id === id).name}?`)
    if (confirm) {
      personService
        .remove(id)
        .then(setPersons(persons.filter(p => p.id !== id)))
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumChange = (event) => setNewNum(event.target.value)
  const filterShown = (event) => setFilter(event.target.value)

  const filteredPersons = filter.length === 0
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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