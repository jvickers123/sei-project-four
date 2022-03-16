import React from 'react'
import axios from 'axios'

// HELPERS
import { getTokenFromLocal } from '../../../helpers/auth'

// STYLING
import {Modal, useDisclosure, ModalContent, ModalBody, ModalCloseButton } from '@chakra-ui/react'


const DeleteProfile = ({ logOutState, logOut }) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const deleteProfile = async () => {
    const token = getTokenFromLocal()
    window.localStorage.removeItem('token-birds-of-a-feather')

    try {
      await axios.delete('/api/auth/profile/', { headers: {Authorization: `Bearer ${token}` }})
      logOutState()      
    } catch (error) {
      console.log(error.response.data.detail)
    }
  }

  return (
    <>
      <button className='dark-pink delete-profile-btn' onClick={onOpen}>Delete Profile</button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalContent width='95%' borderRadius={15} >
          <ModalBody>
            <form>
              <label>Are you sure?</label>
              <button className='dark-pink' onClick={deleteProfile}>Yes, delete profile</button>
              <button onClick={onClose}>No</button>
            </form>
          </ModalBody>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </>

  )
}

export default DeleteProfile