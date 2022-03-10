import React from 'react'

// STYLING
import {Modal, useDisclosure, ModalContent, ModalBody, ModalCloseButton } from '@chakra-ui/react'

const EditingProfileModal = ({content}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <button className='pink small-btn' onClick={onOpen}>Update</button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalContent width='95%' borderRadius={15} >
          <ModalBody>
            {content}
          </ModalBody>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </>
    
  )
}

export default EditingProfileModal