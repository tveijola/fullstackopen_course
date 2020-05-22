import React from 'react'

const PersonForm = ({ newName, newNum, handleNameChange, handleNumChange, addPerson }) => (
  <div><h3>Add a new entry</h3>
    <form onSubmit={addPerson}>
      <div>Name:   <input value={newName} onChange={handleNameChange} /></div>
      <div>Number: <input value={newNum} onChange={handleNumChange} /></div>
      <div><button type="submit">add</button></div>
    </form>
  </div>
)

export default PersonForm