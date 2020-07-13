import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({
    message: null,
    isError: false
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  const notify = (message, isError) => {
    setNotification({ message, isError })
    setTimeout(() => clearNotification(), (isError) ? 3000 : 2000)
  }

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

  const addBlog = async (blogObject) => {
    try {
      const response = await blogService.create(blogObject)
      const updatedBlogList = await blogService.getAll()
      setBlogs(updatedBlogList)
      notify(`Created blog: ${response.title} ${response.author}`, false)
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      notify('New blog must contain at least title or url', true)
    }
  }

  const incrementLikes = async blog => {
    try {
      const modifiedBlog = {
        creator: blog.creator.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
        id: blog.id
      }
      const savedBlog = await blogService.put(modifiedBlog)
      setBlogs(blogs.map(b => {
        if (b.id === savedBlog.id) {
          b.likes = savedBlog.likes
        }
        return b
      }
      ))
    } catch (exception) {
      notify(exception.message, true)
    }
  }

  const removeBlog = async blog => {
    try {
      const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
      if (result) {
        await blogService.remove(blog)
        setBlogs(blogs.filter(b => b.id !== blog.id))
      }
    } catch (exception) {
      notify(exception.message, true)
    }
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
          <button type="submit">Logout</button>
        </p>
      </form>
      <Togglable buttonLabel='New Blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} incrementLikes={incrementLikes} removeBlog={removeBlog} username={user.username} />
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