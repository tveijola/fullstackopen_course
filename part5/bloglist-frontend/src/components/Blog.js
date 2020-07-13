import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, incrementLikes, removeBlog, username }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const removeButton = () => {
    if (username === blog.creator.username) {
      return (
        <button className="removeButton" style={{ background: 'red' }} onClick={() => removeBlog(blog)}>
          Remove
        </button>
      )
    }
  }

  const details = () => {
    return (
      <div>
        {blog.url}<br />
        Likes: {blog.likes}
        <button className="likeButton" style={{ marginLeft: 5 }} onClick={() => { incrementLikes(blog) }}>
          Like
        </button><br />
        {blog.creator.name}<br />
        {removeButton()}
      </div>
    )
  }

  return (
    <div className="blog">
      {blog.title} -- {blog.author}
      <button className="toggleDetailsButton" style={{ marginLeft: 5 }} onClick={toggleDetails}>
        {showDetails ? 'Hide Details' : 'View Details'}
      </button>
      {showDetails && details()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  incrementLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

export default Blog
