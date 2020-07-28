import React, { useState } from 'react'
import { likeBlog, commentBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { CardHeader, Card, CardContent, Divider, Typography, Button, TextField } from '@material-ui/core'

const SingleBlogView = ({ blog }) => {

  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  if (!blog) {
    return null
  }

  const addComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog.id, comment))
    setComment('')
  }

  return (
    <Card style={{ backgroundColor: 'lightgray' }}>
      <CardHeader title={blog.title} subheader={`by ${blog.author}`} />
      <Divider />
      <CardContent>
        <Typography>
          {blog.likes} likes
          <Button
            style={{ margin: 5 }}
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => dispatch(likeBlog(blog))}>
            Like
          </Button>
        </Typography>
        <Typography>{blog.url}</Typography>
        <Typography>Added by {blog.creator.name}</Typography>
        <Divider />
        <h3>Comments</h3>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
        <form onSubmit={addComment}>
          <TextField label="Comment" onChange={({ target }) => setComment(target.value)} />
          <Button variant="contained" type="submit" color="primary">Add comment</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default SingleBlogView