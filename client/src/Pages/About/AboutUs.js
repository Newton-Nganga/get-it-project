import React from 'react'
import  {Box,Text,Image,Heading} from '@chakra-ui/react'
//import About from '../../Components/AboutUs/About'
import Navigation from '../../Components/Navbar/Navigation'
import AboutImg from './aboutus.png'
import './AboutUs.css'


const AboutUsPage=()=>{
    return(
        <Box className='AboutWrapper'w='100vw' h='100vh' bgColor='rgb(220, 255, 220)'>
        <Box className='NavigationComponent' p='0' fontSize='inherit'>
        <Navigation/>
        </Box>
        <Box display='block' m='0 auto' p='1rem' color={'#131a13'} textAlign='center' > <Heading>AboutUs</Heading></Box>
          <Box display={'flex'} justifyContent='center' className='AboutSection'>
            <Box display='inline-block' maxW={'400px'}>
            <Text className='AboutParagraph'>Get it.com comes in to rescue the hundreds of unemployed professionals.This platform tries to connect the
             trusted and reliable professionals to potential clients.We aim at reducing the high unemployment rates. </Text>
             <Text textAlign={'center'}><i>a product of Newton Ng'ang'a</i></Text>
            </Box>
            <Box display='inline-block' maxW='500px'>
            <Image src={AboutImg} alt='...'/>
             </Box>

          </Box>
         </Box>
    )
}

export default AboutUsPage