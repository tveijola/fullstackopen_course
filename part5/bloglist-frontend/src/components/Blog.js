import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const details = (blog) => {
    return (
      <div>
        {blog.url}<br/>
        Likes: {blog.likes}<button style={{ marginLeft: 5 }}>Like</button><br/>
        {blog.creator.name}<br/>
      </div>
    )
  }

  return (
    <div className="blog">
      {blog.title} {blog.author}
      <button style={{ marginLeft: 5 }} onClick={toggleDetails}>
        {showDetails ? 'Hide Details' : 'View Details'}
      </button>
      {showDetails && details(blog)}
    </div>
  )
}

export default Blog
