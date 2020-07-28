import React from 'react'
import { Link } from 'react-router-dom'
import { TableRow, TableCell } from '@material-ui/core'

const User = (props) => {
  return (
    <TableRow>
      <TableCell>
        <Link to={`/users/${props.user.id}`}>
          {props.user.name}
        </Link>
      </TableCell>
      <TableCell>{props.user.blogs.length}</TableCell>
    </TableRow>
  )
}

export default User