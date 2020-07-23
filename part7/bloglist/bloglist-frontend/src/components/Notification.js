import React from 'react'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }
  const type = (notification.isError) ? 'error' : 'notification'
  return (
    <div id="notification" className={type}>
      {notification.message}
    </div>
  )
}

export default Notification