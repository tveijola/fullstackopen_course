import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog, username }) => {
  const [showDetails, setShowDetails] = useState(false)

  const dispatch = useDispatch()

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const removeButton = () => {
    if (username === blog.creator.username) {
      return (
        <button className="removeButton" style={{ background: 'red' }} onClick={() => dispatch(removeBlog(blog))}>
          Remove
        </button>
      )
    }
  }

  const details = () => {
    return (
      <div className="blogDetails">
        <div>{blog.url}</div>
        <div className="likes">
          Likes: {blog.likes}
          <button className="likeButton" style={{ marginLeft: 5 }} onClick={() => dispatch(likeBlog(blog))}>
            Like
          </button>
        </div>
        <div>
          {blog.creator.name}
        </div>
        <div>
          {removeButton()}
        </div>
      </div>
    )
  }

  return (
    <div className="blog">
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} -- {blog.author}
      </Link>
      <button className="toggleDetailsButton" style={{ marginLeft: 5 }} onClick={toggleDetails}>
        {showDetails ? 'Hide Details' : 'View Details'}
      </button>
      {showDetails && details()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired
}

export default Blog
