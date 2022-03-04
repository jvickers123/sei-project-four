import React from 'react'

// components
import Age from './createAccount/Age'
import Gender from './createAccount/Gender'
import Location from './createAccount/Location'
import Pictures from './createAccount/Pictures'

const Register = () => (
  <>
    <h1>Register</h1>
    <p>Email</p>
    <p>first name</p>
    <p>Password</p>
    <p>Password confirmation</p>
    <Age />
    <Gender />
    <Location />
    <Pictures />
  </>
  )

export default Register