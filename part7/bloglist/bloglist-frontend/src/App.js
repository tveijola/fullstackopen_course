import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LoginForm from './components/LoginForm'
import { fetchBlogs } from './reducers/blogReducer'
import { setLoggedInUser } from './reducers/userReducer'
import blogService from './services/blogs'

import './index.css'
import BlogView from './components/BlogView'

const App = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(fetchBlogs())
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setLoggedInUser(user))
    }
  }, [dispatch])

  return (
    <div>
      {user === null
        ? <LoginForm />
        : <BlogView />}
    </div>
  )
}

export default App