import React, { useEffect,useState} from 'react'
import './profiles.css'
import axios from 'axios'
import {Box,Text,ButtonGroup,Button,Avatar,Popover,PopoverBody,PopoverCloseButton,PopoverArrow,PopoverTrigger,PopoverContent} from '@chakra-ui/react'
import {FiPhoneCall} from 'react-icons/fi'
import {BsChatSquareText,BsWhatsapp} from 'react-icons/bs'
import {MdOutlineMailOutline} from 'react-icons/md'
import {GoLocation} from 'react-icons/go'
//search bar/filter
import '../profiles.css'

//body data--- the profiles with ads
function Carpenter() {
const [data,setData] =useState([]);

useEffect(()=>{
const fetchData = async()=>{
const dataFetched = await axios.get('/api/profiles')

  // .then((data)=>{
    setData(dataFetched)
    console.log(data)
  // })
  // .catch((err)=>{
  //   console.log(err) 
  // })
}
fetchData();
})

  return (
    // <Profiles
    //   data={data}
    // />

      <Box className='Profile-Section'>
      
    {data.map((data,index)=>{
        return(
        <Box className='Profile-Card' key={index}> 
        <Box className='Profile-Image'>
        <Avatar size='xl' src={data.image}></Avatar>
          </Box>
           <Box className='Details-Container'>
          <Text className='Name-Section'>{data.fName} {data.lName}</Text>
          <Text className='Location-Section'><GoLocation/>{data.location}</Text>
          <Text>Age: {data.age}</Text>
          <Text>Gender:{data.gender}</Text>
         </Box>
           <Box className='Profile-Info'>
          <Box className='Bio-Section'>
          <Text className='Bio-Section'>{data.bio}</Text>
          </Box>
          <Box id='Button-Group-Cover'>
        <ButtonGroup id='Button-Group'>
        <Popover isLazy>
         <PopoverTrigger>
          <Button className='buttons'  bgColor='white'><FiPhoneCall stroke='#fd4c4c'/></Button>
        </PopoverTrigger>
        <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
        call : {data.phone}
         </PopoverBody>
      </PopoverContent>
      </Popover>
      <Popover isLazy>
         <PopoverTrigger>
         <Button className='buttons'  bgColor='white'><BsChatSquareText style={{color:'blue',fontSize:'20px'}}/></Button>
          </PopoverTrigger>
        <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
        call : {data.phone}
         </PopoverBody>
      </PopoverContent>
      </Popover>
     
     <Popover isLazy>
         <PopoverTrigger>
         <Button className='buttons'  bgColor='white'><MdOutlineMailOutline style={{color:'red',fontSize:'20px'}}/></Button>
       </PopoverTrigger>
        <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
        email : {data.email}
         </PopoverBody>
      </PopoverContent>
      </Popover>
      <Popover isLazy>
         <PopoverTrigger>
         <Button className='buttons'  bgColor='white'><BsWhatsapp fill='green'/></Button>
        </PopoverTrigger>
        <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
        whatsapp : {data.whatsapp}
         </PopoverBody>
      </PopoverContent>
      </Popover>
         </ButtonGroup>
        </Box>
          </Box>
          </Box>)
        })}
         
        </Box>
      )
    }


export default Carpenter
