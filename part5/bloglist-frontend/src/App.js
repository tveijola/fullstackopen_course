import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({
    message: null,
    isError: false
  })

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [user, setUser] = useState(null)

  const notify = (message, isError) => ({ message, isError })

  const clearNotification = () => {
    setNotification({
      message: null,
      isError: false
    })
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification(notify(`Succesfully logged in: ${user.username}`, false))
      setTimeout(() => clearNotification(), 2000)
    } catch (exception) {
      setNotification(notify('Invalid username or password!', true))
      setTimeout(() => clearNotification(), 3000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    blogService.setToken(null)
    setUser(null)
    setNotification(notify('Logged out!', false))
    setTimeout(() => clearNotification(), 2000)
  }

  const createBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        author: author,
        title: title,
        url: url
      }
      const response = await blogService.create(newBlog)
      setBlogs(blogs.concat(response))
      setAuthor('')
      setTitle('')
      setUrl('')
      setNotification(notify(`Created blog: ${response.title} ${response.author}`, false))
      setTimeout(() => clearNotification(), 2000)
    } catch (exception) {
      setNotification(notify('New blog must contain at least title or url', true))
      setTimeout(() => clearNotification(), 3000)
    }
  }

  const loginForm = () => (
    <div>
      <h1>Login to application</h1>
      <Notification notification={notification} />
      <form onSubmit={handleLogin}>
        <div>
          Username
            <input type='text' value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          Password
            <input type='password' value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <h1>Blogs</h1>
      <Notification notification={notification} />
      <form onSubmit={handleLogout}>
        <p>
          {user.name} Logged in
          <button type="submit">Logout</button>
        </p>
      </form>
      <h2>Create new blog</h2>
      <form onSubmit={createBlog}>
        <div>
          Title:
            <input type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          Author:
            <input type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          Url:
            <input type="text" value={url} name="Url" onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">Create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      {user === null ?
        loginForm() :
        blogForm()}
    </div>
  )
}

export default App