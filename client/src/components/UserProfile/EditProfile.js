import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'

// STYLING
import { Image, Box } from '@chakra-ui/react'

// subcomponents
import ImageUploadField from '../subComponents/ImageUploadField'
import { getTokenFromLocal } from '../../helpers/auth'
import Name from '../auth/createAccount/Name'
import Location from '../auth/createAccount/Location'
import Age from '../auth/createAccount/Age'
import ChangePassword from '../subComponents/ChangePassword'
import DeleteProfile from './subComponents/DeleteProfile'

const EditProfile = ({ user, updateUser }) => {

  const toast = useToast()

  // STATE
  const [userPictures, setUserPictures] = useState({
    profile_pic: '',
    pictures: []
  })
  const [isEditing, setIsEditing] = useState({
    name: false,
    location: false,
    age: false
  })

  // REMOVE PHOTOS
  const removePicture = (index) => {
    userPictures.pictures.splice(index, 1)
    setUserPictures({ ...userPictures })
  }

  // SET IMAGE URL TO STATE
  const handleImageUrl = (name, url) => {
    if (name === 'profile_pic') { 
      setUserPictures({...userPictures, [name]: url})
    } else {
      setUserPictures({...userPictures, [name]: [...userPictures.pictures, url]})
    }
  }

  // ADD USER IMAGES TO STATE
  useEffect(() => {
    setUserPictures({
      profile_pic: user.profile_pic,
      pictures: user.pictures
    })
  }, [])

  // POST NEW IMAGES TO USER PROFILE
  useEffect(() => {
    const postPicture = async () => {
      const token = getTokenFromLocal()
      if (!userPictures.profile_pic && !userPictures.pictures.length) return
      try {
        await axios.put('/api/auth/profile/', userPictures, { headers: {Authorization: `Bearer ${token}` }})
        updateUser()
        toast({
          title: 'Added image.',
          description: `Added image to profile.`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      } catch (error) {
        console.log(error.response.data.detail)
      }
    }
    postPicture()
  }, [userPictures])

  // CLOSE COMPONENT WHEN EDITING SUBMITTED
  const closeComponent = (component) => {
    setIsEditing({...isEditing, [component]: false})
    updateUser()
  } 

  return (
    <>
      <Box marginTop={55}  padding={3} width='100%'>
        <p className='faint'>My Profile Pic</p>
        <Box display='flex'>
          {!!user.profile_pic &&
            <Image src={user.profile_pic} alt={user.first_name} objectFit='cover' margin={5} borderRadius={7} boxSize='100px'/>}
          <ImageUploadField name='profile_pic' handleImageUrl={handleImageUrl} url={''}/>
        </Box>
      </Box>

      <Box width='100%' padding={3}>
        <p className='faint'>My Photo's & Videos</p>
        <Box display='flex' flexWrap='wrap'>
          {!!user.pictures.length && 
            user.pictures.map((url, i) => (
              <div key={i} className='edit-photos-container'>
                <button onClick={() => removePicture(i)}>x</button>
                <Image src={url} alt={user.first_name + i} objectFit='cover' marginRight={5} borderRadius={7} boxSize='100px'/>
                </div>
            ))}
            {user.pictures.length < 5 &&
              <ImageUploadField name='pictures' handleImageUrl={handleImageUrl} url={''} />}
        </Box>
        
        
      </Box>
      
      <div className='profile-info-container'>

        <p className='faint'>My info</p>

        <p>Name: {user.first_name} {user.last_name}</p>
        <button onClick={() => setIsEditing({...isEditing, name: true})}>Update</button>
        {!!isEditing.name && <Name parent='profile' closeComponent={closeComponent}/>}

        <p>Location {user.location} </p>
        <button onClick={() => setIsEditing({...isEditing, location: true})}>Update</button>
        {!!isEditing.location && <Location parent='profile' closeComponent={closeComponent}/>}

        <p>Age: {user.age}</p>
        <button onClick={() => setIsEditing({...isEditing, age: true})}>Update</button>
        {!!isEditing.age && <Age parent='profile' closeComponent={closeComponent}/>}

        <ChangePassword />
        
        <DeleteProfile />

      </div>
    </>
  )
}

export default EditProfile