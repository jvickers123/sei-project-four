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

  const nextForm = (num) => {
    const nextForm = { form: formShowing.form + num}
    setFormShowing(nextForm)
  }

  return (
    <>
      <h1>Register</h1>
      {formShowing.form === 0 && <RegisterForm nextForm={nextForm} />}
      {formShowing === 1 && <Name nextForm={nextForm} />}
      {formShowing === 2 && <Age nextForm={nextForm} />}
      {formShowing === 3 && <Location nextForm={nextForm}  />}
      {formShowing === 4 && <Pictures nextForm={nextForm} />}
    </>
  
  )
}

export default Register