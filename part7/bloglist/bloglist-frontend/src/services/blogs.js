import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async blog => {
  const config = {
    headers: { Authorization: token }
  }
  const request = await axios.post(baseUrl, blog, config)
  return request.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const put = async blog => {
  const config = {
    headers: { Authorization: token }
  }
  const url = `${baseUrl}/${blog.id}`
  const request = await axios.put(url, blog, config)
  return request.data
}

const remove = async blog => {
  const config = {
    headers: { Authorization: token }
  }
  const url = `${baseUrl}/${blog.id}`
  const request = await axios.delete(url, config)
  return request.data
}

const comment = async (blogId, comment) => {
  const config = {
    headers: { Authorization: token }
  }
  const url = `${baseUrl}/${blogId}/comments`
  const request = await axios.post(url, { comment }, config)
  return request.data
}

export default { setToken, create, getAll, put, remove, comment }