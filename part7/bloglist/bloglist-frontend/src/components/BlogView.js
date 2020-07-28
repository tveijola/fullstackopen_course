import React, { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import { useSelector } from 'react-redux'
import { TableContainer, Table, TableBody, Paper } from '@material-ui/core'

const BlogView = () => {

  const blogs = useSelector(state => state.blogs)
  const blogFormRef = useRef()

  return (
    <div>
      <Togglable buttonLabel='New Blog' ref={blogFormRef}>
        <BlogForm toggleRef={blogFormRef} />
      </Togglable>
      <TableContainer style={{ marginTop: 15 }} component={Paper}>
        <Table>
          <TableBody>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogView