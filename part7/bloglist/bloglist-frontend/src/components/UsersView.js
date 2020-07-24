import React, { useEffect } from 'react'
import User from './User'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../reducers/userReducer'

const UsersView = () => {

  const users = useSelector(state => state.users)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  if (!users) {
    return null
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <User key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersView