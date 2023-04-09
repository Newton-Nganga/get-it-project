import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import {Formik,Form} from 'formik'
import {Box,Stack,Heading,Input,Button,Text,useToast,
         FormControl,FormLabel,InputGroup,Center,InputRightElement,Link} from '@chakra-ui/react'
import {BiHide,BiShow} from 'react-icons/bi'
import {FaFacebook} from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc';

const UserLogin=()=>{
  let navigate=useNavigate();
  useEffect(()=>{
    const isAuthenticated = window.sessionStorage.getItem('isAuthenticated')
    if(isAuthenticated){
     navigate('/user/Account')
    }
  },[])
  return(
    <Box className='UserLogin'>
        <UserLoginElement navigate={navigate}/>
    </Box>
  )
}

const initialValues={
  email:'',pass:''
}





const Validate=(values)=>{
let errors={}
const Yup_email =/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
const Yup_password =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

if(!values.email){
  errors.email="your email is required"
}else if(!Yup_email.test(values.email)){
  errors.email ='your email is invalid!'
}
if(!values.pass){
  errors.pass="your password is required"
}else if(!Yup_password.test(values.pass)){
  errors.pass ='your password must at least have 8 characters,an uppercase,lowercase,number and one special character'
}
return errors;

}

const UserLoginElement=({navigate})=>{

  const toast= useToast()
  const [showPassword, setShowPassword] = useState(false);
  function handleGoogleAuth(){
    window.open('/api/auth/google')
  
  }
 
  return (
    <Formik
    initialValues={initialValues}
    validate={Validate}
    onSubmit={(values,{resetForm})=>{
      const url = '/api/logins/auth/Login/'
      const data = {email:values.email.toLowerCase(),password:values.pass}
      axios.post(url,data)
      .then((res)=>{
       // console.log(res);
        const isAuthenticated =res.data.data.isAuthenticated
        //console.log(res.data)
        const email =res.data.data.email
        const id =res.data.data.id
        
        resetForm({values:''})
        toast({
        title: 'success',
        description: res.data.message,
        status: 'success',
        duration: 1000,
        isClosable: true,
      })
      window.sessionStorage.setItem('isAuthenticated',isAuthenticated)
      window.sessionStorage.setItem('email',email)
      window.sessionStorage.setItem('id',id)
      if(res.data.data.isAuthenticated === true){
          navigate('/user/Account')
        }else{
          navigate('/auth/Login')
        }
      }).catch(err=>{
      //  console.log(err);
        toast({
        title: 'An error occurred',
        description: err.response.data.message,
        status: 'error',
        duration: 7000,
        isClosable: true,
      })
      })
      // console.log(values);
      
    }}
    
  >
    {(formik) => {
      const {
        values,
        handleChange,
        errors,
        touched,
        handleBlur,
        isValid,
        dirty
      } = formik;
      return(
      <Form>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} w='100vw' mt='20px' p='40px'>
        <Box
          rounded={'lg'}
          bgColor='#e8fff4b5'
          boxShadow={'lg'}
          p={8}>
          <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Welcome back!
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            we missed You 🥳
          </Text>
        </Stack>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address:</FormLabel>
              <Input type="email" placeholder='your-email@example.com' 
              className={errors.email && touched.email ? "input-error" : null}
              focusBorderColor='green.400' name='email' value={values.email} onChange={handleChange} onBlur={handleBlur}/>
            </FormControl>
            {errors.email && touched.email ? (<span className='error'>{errors.email}</span>) : null}
            <FormControl id="confirmPassword" isRequired>
              <FormLabel>Password:</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'}
                className={errors.pass && touched.pass ? "input-error" : null}
                 name='pass' value={values.pass} onChange={handleChange} onBlur={handleBlur}
                 placeholder='your-password' />
                <InputRightElement h={'full'}>
                  <Button
                    p={0}
                    variant={'ghost'}
                    fontSize='1.2em'
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <BiShow /> : <BiHide />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            {errors.pass && touched.pass ? (<span className='error'>{errors.pass}</span>) : null}
            <Stack spacing={10} pt={2}>
              <Button
                type='submit'
                loadingText="logging in"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                width='100%'
                className={dirty && isValid ? "" : "disabled-btn"}disabled={!(dirty && isValid)}
                _hover={{
                  bg: 'blue.500', 
                }}>
                Log in
              </Button>
               <Link href='/auth/recover/password'color='blue.400' mt={0} textAlign='right'>Forgot password?</Link>
            </Stack>
            <Center><Text fontSize='md' color='rgb(76, 76, 76)' p='10px'> or sign in with</Text></Center>
            <Center >
               <Button
               onClick={(e)=>{
                e.preventDefault()
               handleGoogleAuth();
               }}
                 width='100%'
                 variant={'outline'}
                 leftIcon={<FcGoogle />}>
                 <Center>
                   <Text>Sign in with Google</Text>
                 </Center>
               </Button>
             </Center>
             <Center>
                 <Button onClick={(e)=>{
                  e.preventDefault();
                  window.open('/api/auth/facebook');
                 }}
                   w={'full'}
                   maxW={'md'}
                   colorScheme={'facebook'}
                   leftIcon={<FaFacebook />}>
                   <Center>
                     <Text>Continue with Facebook</Text>
                   </Center>
                 </Button>
               </Center>
            <Stack pt={6}>
              <Text align={'center'}>
                 A new user? <Link color={'blue.400'} href='/auth/Register'>Register</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      </Form>
      )
    }}
    </Formik>
  );
}



  export default UserLogin

