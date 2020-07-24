import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import BlogView from './components/BlogView'
import Header from './components/Header'
import LoginForm from './components/LoginForm'
import SingleBlogView from './components/SingleBlogView'
import SingleUserView from './components/SingleUserView'
import UsersView from './components/UsersView'

import { fetchBlogs } from './reducers/blogReducer'
import { setLoggedInUser } from './reducers/loginReducer'
import { fetchUsers } from './reducers/userReducer'

import blogService from './services/blogs'

import './index.css'


const App = () => {

  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.loggedInUser)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(fetchBlogs())
    dispatch(fetchUsers())
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setLoggedInUser(user))
    }
  }, [dispatch])

  const matchUserId = useRouteMatch('/users/:id')
  const specifiedUser = matchUserId
    ? users.find(u => u.id === matchUserId.params.id)
    : null

  const matchBlogId = useRouteMatch('/blogs/:id')
  const specifiedBlog = matchBlogId
    ? blogs.find(b => b.id === matchBlogId.params.id)
    : null

  return (
    <div>
      <Header />
      <Switch>
        <Route path="/users/:id">
          <SingleUserView user={specifiedUser} />
        </Route>
        <Route path="/users">
          <UsersView />
        </Route>
        <Route path="/blogs/:id">
          <SingleBlogView blog={specifiedBlog} />
        </Route>
        <Route path="/">
          {loggedInUser === null
            ? <LoginForm />
            : <BlogView />}
        </Route>
      </Switch>
    </div>
  )
}

export default App