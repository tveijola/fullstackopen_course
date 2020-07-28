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
          <TextField label="Title" onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          <TextField label="Author" onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          <TextField label="Url" onChange={({ target }) => setUrl(target.value)} />
        </div>
        <Button style={{ margin: 5 }} variant="contained" color="primary" type="submit">Create</Button>
      </form>
    </div>
  )
}

export default BlogForm