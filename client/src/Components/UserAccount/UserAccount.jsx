import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {Avatar,AvatarBadge,Box,Text,Button,Link,Stack,HStack,useToast} from '@chakra-ui/react'
import axios from 'axios'
import './UserAccount.css'
import Navigation from '../Navbar/Navigation'
import {FaUserEdit} from 'react-icons/fa'



function UserAccount() {
  const navigate=useNavigate();
  const toast = useToast();
  const email= window.localStorage.getItem('email')
  const [data,setData]=useState({})
  useEffect(()=>{
      //  const fetchData=async()=>{
       axios.get(`/api/accounts/${email}/email`)
       .then((dataFetched)=>{
       // console.log(dataFetched.data.data[0])
        setData(dataFetched.data.data[0]);
       })
      .catch((err)=>{
        if(err.response.status === 404){
          toast({
            title: 'Empty fields',
            description: "Create your profile and generate your ad",
            status: 'warning',
            duration: 8000,
            isClosable: true,
          })
        }
        // console.log(err)
      })
       
    // // }
    // fetchData();
  },[])

  const handleDelete=()=>{
    axios.delete(`/api/accounts/delete/${email}/email`)
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
  }
  return(
  <Box className='userAccountWrapper'>

  <Box className='Navbar'>
  <Navigation />
 
  </Box>
     <Stack className="userIcon">
     <Stack textAlign={'center'} top='100px' position={'relative'}>
        <Avatar size='xl' src={data.image} alt='...'>
           <AvatarBadge boxSize='0.7em' bg='green.500' />
        </Avatar>
        <Text>{data.fName}{data.lName}</Text>
  </Stack>  
   <Button as={Link} leftIcon={<FaUserEdit/>} href='/user/Account/profile'left='200px' top='10px'>Edit</Button>
    </Stack>
  <Box className='userAccountContainer'>
  <Stack display='flex' mt={'2.6rem'} flexDirection={'row'} >
  <Stack className='userBioData rx'>
        <Text>Gender: {data.gender}</Text>
        <Text>Location: {data.location}</Text>
        <Text>Age: {data.age}</Text>
    </Stack>
    <Stack className='rx'>
        <Text>email:{data.email}</Text>
        <Text>Phone:{data.phone}</Text>
        <Text>Whatsapp:{data.whatsapp}</Text>
        <Text>Category:{data.category}</Text>
    </Stack>
    <Stack className='rx'>
        <Text>Bio: {data.bio}</Text>
    </Stack>
  </Stack>
  <HStack justifyContent={'space-between'} w={'auto'} m='auto'>
  <Button height={'auto'} p='10px' w={'10rem'} m={'20px'} bgColor={'blue.500'} onClick={()=>{navigate('/user/Account/inbox')}}>
   My inbox
  </Button>
  <Button height={'auto'} p='10px' w={'10rem'} m={'20px'} bgColor={'teal.500'} onClick={()=>{navigate('/user/Account/ad')}}>
   Generate Ad
  </Button>
  <Button height={'auto'} p='10px' w={'10rem'} m={'20px'} bgColor={'red.500'} onClick={handleDelete}>
   Delete Account
  </Button>
  </HStack>
  </Box>
  <Box w='300px' h='300px'>
  </Box>
  
  </Box>
 )
  }


  export default UserAccount