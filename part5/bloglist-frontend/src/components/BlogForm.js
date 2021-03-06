import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      author: author,
      title: title,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form id="createBlogForm" onSubmit={addBlog}>
        <div>
          Title:
          <input id="titleInput" type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          Author:
          <input id="authorInput" type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          Url:
          <input id="urlInput" type="text" value={url} name="Url" onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button id="create-blog-button" type="submit">Create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm