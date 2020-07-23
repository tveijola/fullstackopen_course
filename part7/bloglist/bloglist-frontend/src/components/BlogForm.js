import React, { useState } from 'react'

import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const BlogForm = ({ toggleRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    dispatch(createBlog({
      author: author,
      title: title,
      url: url
    }))
    toggleRef.current.toggleVisibility()
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

export default BlogForm