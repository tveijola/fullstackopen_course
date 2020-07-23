import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

import { setNotification, clearNotification } from './reducers/notificationReducer'
import { fetchBlogs } from './reducers/blogReducer'

import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)

  const notify = (message, isError) => {
    dispatch(setNotification(message, isError))
    setTimeout(() => dispatch(clearNotification()), (isError) ? 3000 : 2000)
  }

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

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
      notify(`Succesfully logged in: ${user.username}`, false)
    } catch (exception) {
      notify('Invalid username or password!', true)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    blogService.setToken(null)
    setUser(null)
    notify('Logged out!', false)
  }

  const loginForm = () => (
    <div>
      <h1>Login to application</h1>
      <Notification notification={notification} />
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input id="loginUsername" type='text' value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          Password
          <input id="loginPassword" type='password' value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button id="login-button" type="submit">Login</button>
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
          <button id="logoutButton" type="submit">Logout</button>
        </p>
      </form>
      <Togglable buttonLabel='New Blog' ref={blogFormRef}>
        <BlogForm toggleRef={blogFormRef} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} username={user.username} />
      )}
    </div>
  )

  blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {user === null ?
        loginForm() :
        blogForm()}
    </div>
  )
}

export default App