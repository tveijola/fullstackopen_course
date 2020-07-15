import React from 'react'
import { incrementVotes } from '../reducers/anecdoteReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    (filter === '')
      ? anecdotes
      : anecdotes.filter(anecdote => (anecdote.content.toLowerCase().includes(filter.toLowerCase())))
  )
  anecdotes.sort((anec1, anec2) => anec2.votes - anec1.votes)

  const vote = (anecdote) => {
    dispatch(incrementVotes(anecdote))
    dispatch(setNotification(`You voted for '${anecdote.content}'`, 5))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} votes
            <button style={{ marginLeft: 5 }} onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList