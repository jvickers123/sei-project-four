import React, { useState } from 'react'

// components
import RegisterForm from './createAccount/RegisterForm'
import Name from './createAccount/Name'
import Age from './createAccount/Age'
import Pictures from './createAccount/Pictures'
import Location from './createAccount/Location'

const Register = () => {

  // state
  const [formShowing, setFormShowing] = useState({ form: 0 })
  // const [userId, setUserId] = useState(null)

  const nextForm = (num) => {
    const nextForm = { form: formShowing.form + num}
    setFormShowing(nextForm)
  }

  // const getUserId = (id) => {
  //   setUserId(id)
  // }

  return (
    <>
      <h1>Register</h1>
      {formShowing.form === 0 && <RegisterForm nextForm={nextForm} />}
      {formShowing.form === 1 && <Name nextForm={nextForm} parent='register'/>}
      {formShowing.form === 2 && <Age nextForm={nextForm} parent='register'/>}
      {formShowing.form === 3 && <Location nextForm={nextForm} parent='register'/>}
      {formShowing.form === 4 && <Pictures nextForm={nextForm} />}
    </>
  
  )
}

export default Register