import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// HELPERS
import { userAuth } from '../helpers/auth'

// STYLING
import { Heading, Image } from '@chakra-ui/react'

// SEED COMPONENTS
// import SeedUsersAnswerAllQuestions from '../helpers/seedFunctions'

const Home = () => {

  const navigate = useNavigate()

  // CHECK IF USER IS LOGGED IN
  useEffect(() => {
    userAuth() && navigate('/profile')
  }, [])

  return (
    <div className='main-home-container'>
      {/* <SeedUsersAnswerAllQuestions /> */}

      <div id='home-background'>
        <div className='title-container'>
          <Heading as='h1' size='3xl'>Birds of a Feather</Heading>
          <h3>Would rather be together</h3>
        </div>
        <div className='home-btns-container'>
            <button className='dark-pink' onClick={() => navigate('/register')}>Create account</button>
            <button onClick={() => navigate('/login')}>Sign in</button>
            <p>(Scroll for more info)</p>
        </div>
      </div>
      
      <div className='info-home'>
        <div className='info-container'>
          <Heading as='h3' size='md'>About this site</Heading>
          <Heading as='h2' size='xl'>A fun approach to online dating.</Heading>

          <div className='photo-text-container'>
            <Image src='https://i.imgur.com/K8TGqtd.png' alt='screenshot-similar-likes' objectFit='contain' marginTop={5} borderRadius={7} boxSize='360px'/>
            <p className='faint'>Answer would you rather questions and review potential matches based on your answers.</p>
            <Image className='hidden-photo' src='https://i.imgur.com/k9NASrv.png' alt='screenshot-questions' objectFit='contain' marginTop={5} borderRadius={7} boxSize='360px'/>
          </div>
        </div>

        <div className='info-container'>
          <Heading as='h2' size='xl'>Create an account in seconds.</Heading>
          <div className='photo-text-container'>
          <Image className='hidden-photo' src='https://i.imgur.com/Mw3oVVW.png' alt='screenshot-likes-you' objectFit='contain' marginTop={5} borderRadius={7} boxSize='360px'/>
          <p className='faint'>To immediately see the full functionality of the sight, use the get random photos button. 6 profiles will also automatically like your profile upon creation.</p>
          <Image src='https://i.imgur.com/aAuvSYj.png' alt='screenshot-load-photos' objectFit='contain' marginTop={5} borderRadius={7} boxSize='360px'/>
          </div>
        </div>
      </div>

      <div className='home-footer-container'>
        <p>Created by <a href='http://github.com/jvickers123'>Jonny Vickers</a></p>
      </div>
      
    </div>
  )
}

export default Home