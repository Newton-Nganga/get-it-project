import React from 'react'
import './Hero.css'
import GetItImage from './getit-image.png'
import {Box,Text,Image} from '@chakra-ui/react'
// import {Button} from 'bootstrap'
// import Navbar from '../Navbar/Navbar'
import Navigation from '../Navbar/Navigation'
function Hero() {
  return (
          <HeroWrapper >  
          </HeroWrapper>
  )
}

const HeroWrapper=({setTarget,scrollToComponent })=>{
    return(
        
        <div id='Hero-Wrapper'>
        {/* <Navbar setTarget={setTarget} scrollToComponent={scrollToComponent}/> */}
        <Navigation/>
        <Box className='HeroMainSection'>
        <HeaderText/>
        <GetImage/>
        </Box>
        
        
         {/* <SearchBar/> */}

        </div>
       
    )
}

const HeaderText=()=>{
    return(
        <Box className='Hero-Text'>
            <Text 
            display='inline-block'
            fontFamily="'Poppins', sans-serif"
            fontSize='3.2em' 
            lineHeight='1.1em'
            fontWeight={700} color='#ffff'>Looking for reliable services?</Text>
            <Text 
            display='inline-block'
           lineHeight={1.2}
            maxWidth='700px'
            textAlign='left'
            fontWeight={500}
            margin='auto'
            fontSize='1.5rem' color='rgb(194 194 194)'>We got you🥳,search the best from the hundreds of profiles and hire today!.Proficiency at service delivery is guaranteed by the professionals.Get it done with the click of a button. </Text>
        </Box>
    )
}



const GetImage=()=>{
    return(
        <Box className='HeroSectionImage'>
            <Image mr='30px' src={GetItImage}/>
        </Box>
    )
}


export default Hero
