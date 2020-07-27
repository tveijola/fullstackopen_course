import React from 'react'
import Notification from './Notification'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'
import { Link } from 'react-router-dom'

const Header = () => {

  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const loggedInUser = useSelector(state => state.loggedInUser)

  if (!loggedInUser) {
    return null
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logoutUser())
  }

  return (
    <div>
      <div style={{ padding: 10, backgroundColor: 'lightgray' }}>
        <Link style={{ paddingLeft: 10 }} to="/">Blogs</Link>
        <Link style={{ paddingLeft: 10 }} to="/users/">Users</Link>
        <i style={{ paddingLeft: 10 }}>{loggedInUser.name} Logged in</i>
        <button style={{ marginLeft: 10 }} onClick={handleLogout} id="logoutButton" type="submit">
          Logout
        </button>
      </div>
      <h1>Blog Application</h1>
      <Notification notification={notification} />
    </div>
  )
}

export default Header