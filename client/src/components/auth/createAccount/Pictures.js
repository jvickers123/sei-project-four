import React from 'react'

const Pictures = ({nextForm, userId}) => {

  return (
    <button onClick={() => nextForm(-1)}>Previous</button>
  )
}

export default Pictures