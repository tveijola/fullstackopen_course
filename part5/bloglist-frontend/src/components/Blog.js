import React, { useState } from 'react'

const Blog = ({ blog, incrementLikes, removeBlog, username }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const removeButton = () => {
    if (username === blog.creator.username) {
      return <button onClick={() => removeBlog(blog)}>Remove</button>
    }
  }

  const details = () => {
    return (
      <div>
        {blog.url}<br/>
        Likes: {blog.likes}
        <button style={{ marginLeft: 5 }} onClick={() => {incrementLikes(blog)}}>
          Like
        </button><br/>
        {blog.creator.name}<br/>
        {removeButton()}
      </div>
    )
  }

  return (
    <div className="blog">
      {blog.title} {blog.author}
      <button style={{ marginLeft: 5 }} onClick={toggleDetails}>
        {showDetails ? 'Hide Details' : 'View Details'}
      </button>
      {showDetails && details()}
    </div>
  )
}

export default Blog
