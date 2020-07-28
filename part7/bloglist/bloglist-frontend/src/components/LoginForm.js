import React, { useState } from 'react'
import Notification from './Notification'
import { loginUser } from '../reducers/loginReducer'

import { useDispatch, useSelector } from 'react-redux'
import { TextField, Button } from '@material-ui/core'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser({ username, password }))
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h1>Login to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          <TextField label="username" onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          <TextField label="password" type="password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </div>
      </form>
      <Notification notification={notification} />
    </div>
  )
}

export default LoginForm