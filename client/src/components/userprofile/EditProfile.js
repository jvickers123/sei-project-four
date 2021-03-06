import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'

// STYLING
import { Image, Box } from '@chakra-ui/react'

// subcomponents
import ImageUploadField from '../subcomponents/ImageUploadField'
import { getTokenFromLocal } from '../../helpers/auth'
import Name from '../auth/createaccount/Name'
import Location from '../auth/createaccount/Location'
import Age from '../auth/createaccount/Age'
import ChangePassword from '../subcomponents/ChangePassword'
import DeleteProfile from './subcomponents/DeleteProfile'
import EditingProfileModal from './subcomponents/EditingModal'
import SeedImages from '../subcomponents/SeedImages'

const EditProfile = ({ user, updateUser, logOutState, logOut }) => {

  const toast = useToast()

  // STATE
  const [userPictures, setUserPictures] = useState({
    profile_pic: '',
    pictures: []
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
    updateUser()
  } 

  // SEED RANDOM PHOTOS FOR USER
  const uploadSeeds = (photosArray) => {
    console.log('happening', photosArray)
    setUserPictures({
      profile_pic: photosArray[0],
      pictures: photosArray.slice(1)
    })
  }

  

  return (
    <div className='edit-profile-flex-container'>
      {!user.pictures.length && <SeedImages uploadSeeds={uploadSeeds} parent='edit'/>}
      <Box marginTop={55}  padding={3} width='100%' id='edit-profile-pic-container'>
        <p className='faint'>My Profile Pic</p>
        <Box display='flex'>
          {/* {!!user.profile_pic &&
            <Image src={user.profile_pic} alt={user.first_name} objectFit='cover' margin={5} borderRadius={7} boxSize='100px'/>} */}
          <ImageUploadField name='profile_pic' handleImageUrl={handleImageUrl} url={userPictures.profile_pic}/>
        </Box>
      </Box>

      <Box width='100%' padding={3}>
        <p className='faint'>My Photo's</p>
        <Box display='flex' flexWrap='wrap' className='edit-photos-flex-container'>
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
      
      <p className='faint'>My info</p>

      <Box className='text-container' margin={5} borderRadius={7} paddingTop={10} paddingBottom={10} paddingLeft={5} paddingRight={5}>
        
        <div className='edit-info-container'>
          <p>Name: {user.first_name} {user.last_name}</p>
          <EditingProfileModal content={<Name parent='profile' closeComponent={closeComponent} />} />
        </div>
        
        <div className='edit-info-container'>
          <p>Location: {user.location} </p>
          <EditingProfileModal content={<Location parent='profile' closeComponent={closeComponent} />} />
        </div>


        <div className='edit-info-container'>
          <p>Age: {user.age}</p>
          <EditingProfileModal content={<Age parent='profile' closeComponent={closeComponent} />} />
        </div>

        

      </Box>
        
      <ChangePassword />
        
      <DeleteProfile logOutState={logOutState} logOut={logOut}/>


    </div>
  )
}

export default EditProfile