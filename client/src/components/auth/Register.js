import React, { useState } from 'react'

// components
import RegisterForm from './createAccount/RegisterForm'
import Name from './createAccount/Name'
import Age from './createAccount/Age'
import Pictures from './createAccount/Pictures'
import Location from './createAccount/Location'

const Register = ({ logInState }) => {

  // STATE
  const [formShowing, setFormShowing] = useState({ form: 0 })

  // GET NEXT FORM 
  const nextForm = (num) => {
    const nextForm = { form: formShowing.form + num}
    setFormShowing(nextForm)
  }


  return (
    <div className='form-main'>
      {formShowing.form === 0 && <RegisterForm nextForm={nextForm} logInState={logInState}/>}
      {formShowing.form === 1 && <Name nextForm={nextForm} parent='register'/>}
      {formShowing.form === 2 && <Age nextForm={nextForm} parent='register'/>}
      {formShowing.form === 3 && <Location nextForm={nextForm} parent='register'/>}
      {formShowing.form === 4 && <Pictures nextForm={nextForm} />}
    </div>
  
  )
}

export default Register