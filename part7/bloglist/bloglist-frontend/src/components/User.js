import React from 'react'

const User = (props) => {
  return (
    <tr>
      <td>{props.user.name}</td>
      <td>{props.user.blogs.length}</td>
    </tr>
  )
}

export default User