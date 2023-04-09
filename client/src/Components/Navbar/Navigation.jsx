import React from 'react';
import './Navigation.css'
import axios from 'axios'
// import {withCookies,Cookies} from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Stack,
  Text,useToast
} from '@chakra-ui/react';
// import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
// import { IoMenu } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';
import { CgMenu,CgMenuMotion } from 'react-icons/cg';

export default function Navigation() {
  const toast =useToast()
  const navigate = useNavigate()
   const email=window.sessionStorage.getItem('isAuthenticated')
  const isAuthenticated=window.sessionStorage.getItem('isAuthenticated')
  const handleClick =()=>{
    axios.post(`/api/logins/auth/Logout/${email}`).then(res=>{
     window.sessionStorage.clear();
     navigate('/auth/Login')
     toast({
      title: 'success',
      description: res.data.message,
      status: 'success',
      duration: 1000,
      isClosable: true,
    })
      //console.log(res)
    }).catch(err=>{
      toast({
        title: 'An error occurred',
        description: "Couldn't log you out try again",
        status: 'error',
        duration: 7000,
        isClosable: true,
      })
     // console.log(err)
    })
   ;
    navigate('/auth/Login')
  }
  
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box  px={5} className='NavbarComponent' id='NavigationComponent'>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'} pl='30px' pr='30px'>
          <IconButton
            size={'md'}
            icon={isOpen ? <CgMenuMotion fontSize='2em' fill='#ffff' stroke='#ffff'/> : <CgMenu fontSize='2em' fill='#ffff' stroke='#ffff'/>}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
            bg='inherit'
            id='menuBtn'
          />
          <HStack spacing={8} alignItems={'center'}>
          <Box className='Navbar-Logo'>
            <Text fontSize='1.5em'
            fontWeight={500} color='#ffff'>
              Get-it
            </Text>
          </Box>
            
          </HStack>
          <HStack
              color='#ffff'
              alignSelf='center'
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }} m='0 50px 0 auto'>
              <Link pr='30px' href='/'>Home</Link>
              <Link as={Link} href='/profiles/' pr='30px'>Profiles </Link>
              <Link pr='30px' href='/About'>About us</Link>
              <Link pr='30px' href='/Contact'>Contact</Link>
            </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <FaUserCircle fontSize='2em'fill='#ffff'/>
              </MenuButton>
             {isAuthenticated ? (
              <MenuList>
              <MenuItem as={Button} onClick={handleClick}>Log Out</MenuItem>
              </MenuList>
             ):(<MenuList color='#333433' bgColor='#ffff'>
                <MenuItem as={Link} href='/auth/Login'>Login</MenuItem>
                <MenuDivider/>
                <MenuItem as={Link} href='/auth/Register'>Register</MenuItem>
              </MenuList>)
              } 
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }} id='menuBtnItems'>
            <Stack as={'nav'} spacing={4} color='#333433' bgColor='#ffff'>
             <Link  py='10px' to='/'>Home</Link>
            <Link as={Link} href='/profiles/' >Profiles </Link>
             <Link  py='10px' to='#About'>About</Link>
             <Link  py='10px' to='/Contact'>Contact</Link>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

