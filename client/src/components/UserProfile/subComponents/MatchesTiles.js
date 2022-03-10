import React from "react";

import { Avatar, HStack } from "@chakra-ui/react";

const MatchesTiles = ({ matches, goToFeaturedProfile }) => {

  return (
    <div className='matches-tile-background'>
      {matches.length ?

        matches.map(profile => (
          <HStack key={profile.id} className='matches-tile-container' onClick={() => goToFeaturedProfile(profile.id)}>
            
            <Avatar src={profile.profile_pic} name={profile.first_name} />
            <div className='matches-tile-text-container'>
              <h3>{profile.first_name}</h3>
              <p className='faint'>Start the Chat with {profile.first_name}</p>
            </div>
          </HStack>
        ))
        :
        <p>No likes quite yet</p>
        }
    </div>
  )
}

export default MatchesTiles