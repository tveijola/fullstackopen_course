import React, { useState } from 'react'

import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { TextField, Button } from '@material-ui/core'

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
      <form onSubmit={addBlog}>
        <div>
          <TextField label="Title" value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          <TextField label="Author" value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          <TextField label="Url" value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <Button style={{ margin: 5 }} variant="contained" color="primary" type="submit">Create</Button>
      </form>
    </div>
  )
}

export default BlogForm