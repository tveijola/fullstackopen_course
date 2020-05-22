import React from 'react'

const Filter = ({ filter, filterShown }) => (
  <div>
    Filter shown with:
    <input
      value={filter}
      onChange={filterShown} />
  </div>
)

export default Filter