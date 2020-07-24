import React, { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogView = () => {

  const user = useSelector(state => state.loggedInUser)
  const blogs = useSelector(state => state.blogs)

  const blogFormRef = useRef()

  return (
    <div>
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