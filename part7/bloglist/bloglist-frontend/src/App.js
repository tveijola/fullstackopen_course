import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Header from './components/Header'

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
    <Router>
      <Header />
      <Switch>
        <Route path="/users">
          <UsersView />
        </Route>
        <Route path="/">
          {user === null
            ? <LoginForm />
            : <BlogView />}
        </Route>
      </Switch>
    </Router>
  )
}

export default App