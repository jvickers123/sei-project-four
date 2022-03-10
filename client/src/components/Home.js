import React from 'react'
import { useNavigate } from 'react-router-dom'

// STYLING
import { Heading } from '@chakra-ui/react'

// SEED COMPONENTS
// import SeedUsersAnswerAllQuestions from '../helpers/seedFunctions'

const Home = () => {

  const navigate = useNavigate()

  return (
    <div className='main' id='home-background'>
      
      {/* <SeedUsersAnswerAllQuestions /> */}
      <div className='title-container'>
        <Heading as='h1' size='3xl'>Birds of a Feather</Heading>
        <h3>Would rather be together</h3>
      </div>
      <div className='home-btns-container'>
          <button className='dark-pink' onClick={() => navigate('/register')}>Create account</button>
          <button onClick={() => navigate('/login')}>Sign in</button>
      </div>
    </div>
  )
}

export default Home