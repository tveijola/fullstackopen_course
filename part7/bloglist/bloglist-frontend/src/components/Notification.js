import React from 'react'
import { Alert } from '@material-ui/lab'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }
  const type = (notification.isError) ? 'error' : 'success'
  return (
    <Alert style={{ margin: 15 }} severity={type}>
      {notification.message}
    </Alert>
  )
}

export default Notification