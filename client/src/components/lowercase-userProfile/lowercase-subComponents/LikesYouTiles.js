import React from "react";

import {Box, Image} from '@chakra-ui/react'

const LikesYouTiles = ({ likesRecieved, goToFeaturedProfile }) => {

  return (
    <>
      {likesRecieved.length ?

        likesRecieved.map(profile => (
          <Box key={profile.id} className='likes-profile-container' onClick={() => goToFeaturedProfile(profile.id)} margin={5} borderRadius={7} paddingTop={10} paddingBottom={10} paddingLeft={5} paddingRight={5}>
            <h2>{profile.first_name}</h2>
            <Image src={profile.profile_pic} alt={profile.first_name} objectFit='cover' marginTop={5} borderRadius={7} boxSize='300px'/>
          </Box>
        ))
        :
        <p>No likes quite yet</p>
        }
    </>
  )
}

export default LikesYouTiles