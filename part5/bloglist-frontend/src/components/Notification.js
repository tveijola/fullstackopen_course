import React from 'react'

const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null
  }
  const type = (notification.isError) ? "error" : "notification"
  return (
    <div className={type}>
      {notification.message}
    </div>
  )
}

export default Notification