import React from 'react'
import { connect } from 'react-redux'
import { incrementVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const vote = (anecdote) => {
    props.incrementVotes(anecdote)
    props.setNotification(`You voted for '${anecdote.content}'`, 5)
  }

  return (
    <div>
      {props.anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
  const anecdotes = (state.filter === '')
      ? state.anecdotes
      : state.anecdotes.filter(anecdote => (anecdote.content.toLowerCase().includes(state.filter.toLowerCase())))
  anecdotes.sort((anec1, anec2) => anec2.votes - anec1.votes)
  return {
    anecdotes
  }
}

const mapDispatchToProps = {
  incrementVotes,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)