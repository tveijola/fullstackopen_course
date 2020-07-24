import React, { useRef } from 'react'
import Notification from './Notification'
import { logoutUser } from '../reducers/loginReducer'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'

import { useDispatch, useSelector } from 'react-redux'

const BlogView = () => {

  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.loggedInUser)
  const blogs = useSelector(state => state.blogs)

  const blogFormRef = useRef()

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logoutUser())
  }

  return (
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
}

export default BlogView