import userService from '../services/users'

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_USERS':
      return action.data
    default:
      return state
  }
}

export const fetchUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'FETCH_USERS',
      data: users
    })
  }
}

export default userReducer