import React from 'react'
import Notification from './Notification'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'

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
      <h1>Blogs</h1>
      <Notification notification={notification} />
      <form onSubmit={handleLogout}>
        <p>
          {loggedInUser.name} Logged in
          <button style={{ marginLeft: 5 }} id="logoutButton" type="submit">Logout</button>
        </p>
      </form>
    </div>
  )
}

export default Header