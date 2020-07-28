import React from 'react'
import { Card, CardHeader, CardContent, Typography, Divider } from '@material-ui/core'

const SingleUserView = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <Card style={{ backgroundColor: 'lightgray' }} raised={true} variant="outlined">
      <CardHeader title={user.name}/>
      <Divider />
      <CardContent>
        <Typography>Added blogs</Typography>
        <ul>
          {user.blogs.map(b =>
            <li key={b.id}>{b.title}</li>
          )}
        </ul>
      </CardContent>
    </Card>
  )
}

export default SingleUserView