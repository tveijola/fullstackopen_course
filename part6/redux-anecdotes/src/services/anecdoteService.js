import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async content => {
  const anecdoteObject = {
    content,
    votes: 0
  }
  const response = await axios.post(baseUrl, anecdoteObject)
  return response.data
}

const put = async anecdote => {
  const url = `${baseUrl}/${anecdote.id}`
  const response = await axios.put(url, anecdote)
  return response.data
}

export default {
  getAll,
  create,
  put
}