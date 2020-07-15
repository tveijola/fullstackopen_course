const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION': return action.data
    default: return state
  }
}

export const notificationChange = notification => (
  {
    type: 'SET_NOTIFICATION',
    filter: notification
  }
)

export default notificationReducer