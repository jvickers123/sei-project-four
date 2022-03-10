import React, { useState } from 'react'
import axios from 'axios'

// HELPERS
import { getTokenFromLocal } from '../../helpers/auth'

// STYLING
import {Modal, useDisclosure, ModalContent, ModalBody, ModalCloseButton } from '@chakra-ui/react'


const ChangePassword = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

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
      await axios.put('/api/auth/changepassword/', formData, { headers: {Authorization: `Bearer ${token}` }})
    } catch (error) {
      console.log(error.response.data.detail)
      error.response.data.detail === 'Unauthorised' ?
        setFormErrors({...formErrors, old_password: error.response.data.detail})
        : setFormErrors(error.response.data.detail)
    }
  }

  const handleChange = (e) => {
    const newObj = { ...formData, [e.target.name]: e.target.value}
    console.log(newObj)
    setFormData(newObj)
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  return (
    <>
      <button className='pink' onClick={onOpen}>Change Password</button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalContent width='95%' borderRadius={15} >
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <label htmlFor='old_password'>Enter Old Password</label>
              <input onChange={handleChange} value={formData.old_password} type='password' name='old_password' />
              {!!formErrors.old_password && <p>{formErrors.old_password}</p>}

              <label htmlFor='password'>Enter New Password</label>
              <input onChange={handleChange} value={formData.password} type='password' name='password' />
              {!!formErrors.password && <p>{formErrors.password}</p>}


              <label htmlFor='password_confirmation'>Confirm New Password</label>
              <input onChange={handleChange} value={formData.password_confirmation} type='password' name='password_confirmation' />
              {!!formErrors.password_confirmation && <p>{formErrors.password_confirmation}</p>}

              <input className='pink' type='submit' value='Update' />
            </form>
          </ModalBody>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </>
  )
}

export default ChangePassword