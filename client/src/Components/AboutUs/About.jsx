import React from 'react'
import './About.css'
import Aboutimage from './connnecting-ppl.jpg'
import {Box,Text,Image} from '@chakra-ui/react'
function About() {
  return (
    <Box className='About-Wrapper'>
    <Box className='AboutInnerContainer'>
        <AboutText/>
        <AboutImage/>
    </Box>
        
    </Box>
  )
}

const AboutText=()=>{
return(<Box className='AboutText'>
        <Text className='AboutTextHeader'>Who are we?</Text>
        <AboutParagraph/>
</Box>)
}

const AboutParagraph=()=>{
    return(
        <Text className='AboutParagraph'>Get it.com comes in to rescue the hundreds of unemployed professionals.This platform tries to connect the
        trusted and reliable professionals to potential clients.We aim at reducing the high unemployment rates. </Text>
    )
}


const AboutImage=()=>{
  return(<Box className='AboutImage'>
     <Image src={Aboutimage}></Image>
  </Box>)  
}
export default About