import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdoteService'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const createNewAnecdote = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.create(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(setNotification(`Created new anecdote: '${content}'`, 5))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNewAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm