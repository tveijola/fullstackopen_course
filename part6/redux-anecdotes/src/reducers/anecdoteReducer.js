import anecdoteService from "../services/anecdoteService"

export const createAnecdote = anecdote => (
  {
    type: 'NEW_ANECDOTE',
    data: anecdote
  }
)

export const incrementVotes = id => (
  {
    type: 'INCREMENT_VOTES',
    data: { id }
  }
)

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INCREMENT_VOTES': {
      return state.map(obj =>
        obj.id === action.data.id ?
          { ...obj, votes: obj.votes + 1 } :
          { ...obj }
      )
    }
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE': {
      return [...state, action.data]
    }
    default: return state
  }
}

export default reducer