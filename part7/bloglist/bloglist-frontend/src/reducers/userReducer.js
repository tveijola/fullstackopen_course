import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification, clearNotification } from './notificationReducer'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

const notify = (dispatch, message, isError) => {
  dispatch(setNotification(message, isError))
  setTimeout(() => dispatch(clearNotification()), (isError) ? 3000 : 2000)
}

export const setLoggedInUser = (userObject) => {
  return ({
    type: 'LOGIN',
    data: userObject
  })
}

export const loginUser = (userObject) => {
  return async dispatch => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: user
      })
      notify(dispatch, `Succesfully logged in: ${user.username}`, false)
    } catch (exception) {
      notify(dispatch, 'Invalid username or password!', true)
    }
  }
}

export const logoutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedInUser')
    blogService.setToken(null)
    notify(dispatch, 'Logged out!', false)
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default userReducer