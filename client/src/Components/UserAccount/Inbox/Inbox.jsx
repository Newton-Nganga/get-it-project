import React,{useEffect,useState} from 'react'
import { Box ,Text,Accordion,AccordionItem,Stack,Button,Link,Avatar,useToast
  ,AccordionButton,AccordionIcon,AccordionPanel,Heading,Center} from '@chakra-ui/react'
import './Inbox.css'
import axios from 'axios'
import {FiArrowLeft,} from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'




export default function Inbox(){
const email= window.localStorage.getItem('email')
const [dataArray,setData]=useState([{}])
const initials=[{from:`Your sender`,to:'',title:'Here will go the subject matter',content:'No messages received yet'}]
const toast= useToast()

useEffect(()=>{
     const fetchData=async()=>{
    await axios.get(`api/inbox/messages/byDestination/${email}/email`)
     .then(
      (res)=>{
        setData(res.data.data);}
     )
     .catch((err)=>{
      if(err.response.status === 404){
        setData(initials)
      }
     })
  }
  fetchData();
},[dataArray])


function HandleDelete(props){
 console.log(props)
  const id=props
  const confirmed = window.confirm('Are you sure you want to delete this message?')
if (confirmed){

  const url=`/api/inbox/messages/delete/${id}`
  axios.delete(url)
  .then((res)=>{
    toast({
      title: 'success',
      description: res.data.message,
      status: 'success',
      duration: 4000,
      isClosable: true,
    })
  }).catch(err=>{
    console.log(err)
    toast({
      title: 'success',
      description: err.message,
      status: 'error',
      duration: 4000,
      isClosable: true,
    })
  })
  }else{
    alert('message not deleted')

  }
}


return(
        <Box className='InboxWrapper'>
        <Box display='flex' alignItems={'left'} p='10px'><Button as={Link} href='/user/Account' ><FiArrowLeft/>Back</Button></Box>
        <Center p='30px'> <Heading>My Inbox Messages</Heading></Center>
        
          <Box className='InboxContainer' m='0 auto'> 
          <Stack className='AccordionStack'>
          {dataArray.map((data,index)=>{
            return(
          <Accordion allowToggle  key={index}>
            <AccordionItem  className='item' borderLeft={'2px solid #05cd00'} m='0 auto'>
              <h2>
                <AccordionButton>
                  <Box flex='1' textAlign='left' alignItems={'center'} display='flex'>
                   <Avatar mr='0.7rem' name={data.from}/> from: {data.from}
                   
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                          </h2>
              <AccordionPanel pb={4}>
                <Text fontWeight='bold'>{data.title}</Text>
                {data.content}
                <Text textAlign={'right'}><Text w='fit-content' as={Button} p='0'  fontSize={'1.5rem'} onClick={(e)=>{
                  e.preventDefault();
                  HandleDelete(data._id)
                }}><RiDeleteBin6Line fill='red'  m='0 auto'/></Text></Text>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        )})}
          </Stack>
          
         </Box>
        
     </Box>
         
  
    )
}
