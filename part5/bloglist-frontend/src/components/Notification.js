import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null
  }
  const type = (notification.isError) ? 'error' : 'notification'
  return (
    <div className={type}>
      {notification.message}
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.object.isRequired
}

export default Notification