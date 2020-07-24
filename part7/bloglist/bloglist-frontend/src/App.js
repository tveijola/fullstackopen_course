import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LoginForm from './components/LoginForm'
import { fetchBlogs } from './reducers/blogReducer'
import { setLoggedInUser } from './reducers/loginReducer'
import blogService from './services/blogs'

import './index.css'
import BlogView from './components/BlogView'
import UsersView from './components/UsersView'

const App = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.loggedInUser)

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
      <UsersView />
    </div>
  )
}

export default App