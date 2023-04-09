import React from 'react'
import {Box,Text,Button} from '@chakra-ui/react'
import './NotFound.css'
import {useNavigate} from 'react-router-dom'

const PageNotFound=()=>{
    const Navigate = useNavigate()
return(
<Box className="NotFoundPage">
<Box className='NotFoundComponent'>
  <Box><Text fontSize='2rem' color='#090d1c'>Oops! couldn't find this page</Text>
  <Button onClick={()=>Navigate('/')} id='redirectBtn'>Go to Homepage</Button>
  </Box>
</Box>
</Box>
    )
}

export default PageNotFound