import React from 'react'
import Notification from './Notification'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@material-ui/core'

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
      <AppBar position="static">
        <Toolbar>
          <Button variant="outlined" color="inherit" component={Link} to="/">
            Blogs
          </Button>
          <Button variant="outlined" color="inherit" component={Link} to="/users/">
            Users
          </Button>
          <em style={{ padding: 15 }}>{loggedInUser.name} Logged in</em>
          <Button variant="outlined" color="inherit" onClick={handleLogout} id="logoutButton" type="submit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <h1>Blog Application</h1>
      <Notification notification={notification} />
    </div>
  )
}

export default Header