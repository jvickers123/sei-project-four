import React from "react";

const MatchesTiles = ({ matches, goToFeaturedProfile }) => {

  return (
    <>
      <h1>Matches</h1>
      {matches.length ?

        matches.map(profile => (
          <div key={profile.id} className='likes-profile-container' onClick={() => goToFeaturedProfile(profile.id)}>
            <h2>{profile.first_name}</h2>
            <img src={profile.profile_pic} alt={profile.first_name} />
          </div>
        ))
        :
        <p>No likes quite yet</p>
        }
    </>
  )
}

export default MatchesTiles