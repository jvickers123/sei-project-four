import react, { useState } from 'react'
import axios from 'axios'

// subcomponents
import { getTokenFromLocal } from '../../helpers/auth'

const ChangePassword = () => {

  // STATE
  const [formData, setFormData] = useState({
    old_password: '',
    password: '',
    password_confirmation: ''
  })

  const [formErrors, setFormErrors] = useState({
    old_password: '',
    password: '',
    password_confirmation: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = getTokenFromLocal()
    try {
      const { data } = await axios.put('/api/auth/changePassword/', formData, { headers: {Authorization: `Bearer ${token}` }})
      console.log(data)
    } catch (error) {
      
    }
  }

  const handleChange = (e) => {
    const newObj = { ...formData, [e.target.name]: e.target.value}
    console.log(newObj)
    setFormData(newObj)
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  return (
    <form onSubmit={handleSubmit}>


    </form>
  )
}

export default ChangePassword