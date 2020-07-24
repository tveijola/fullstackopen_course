import React from 'react'
import { likeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const SingleBlogView = ({ blog }) => {

  const dispatch = useDispatch()

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title} -- {blog.author}</h2>
      <div>{blog.url}</div>
      <div>
        {blog.likes} likes
        <button style={{ marginLeft: 5 }} onClick={() => dispatch(likeBlog(blog))}>
          Like
        </button>
      </div>
      <div>Added by {blog.creator.name}</div>
    </div>
  )
}

export default SingleBlogView