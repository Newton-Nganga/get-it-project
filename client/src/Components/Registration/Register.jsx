//eslint 
import React,{useState} from 'react'
import axios from 'axios'
import {Formik,Form} from 'formik'
// import { useNavigate } from 'react-router-dom';
import {
  Box,
  FormControl,
  FormLabel,useToast,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,Center,
  Link,Divider
} from '@chakra-ui/react';
import {BiHide,BiShow} from 'react-icons/bi'
import {FaFacebook} from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc';
import './Register.css'


const initialValues={
  email:'',createPass:'',confirmPass:''
}



const Validate=(values)=>{
let errors={}
const Yup_email =/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
const Yup_password =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

if(!values.email){
  errors.email="Your email is required"
}else if(!Yup_email.test(values.email)){
  errors.email ='invalid email'
}
if(!values.createPass){
  errors.createPass="your password is required"
}else if(!Yup_password.test(values.createPass)){
  errors.createPass ='your password must at least have 8 characters,an uppercase,lowercase,number and one special character'
}
if( !values.confirmPass){
  errors.confirmPass="your password is required"
}else if(!Yup_password.test(values.createPass)){
  errors.confirmPass ='your password must at least have 8 characters,an uppercase,lowercase,number and one special character'
}else if(values.createPass !== values.confirmPass){
  errors.confirmPass='your passwords must match'
}
return errors;

}


 function SignupCard() {

  const [showPassword, setShowPassword] = useState(false);
  const toast= useToast()
  return (
    <Formik
    initialValues={initialValues}
    validate={Validate}
    onSubmit={(values,{resetForm})=>{
    const url='/api/logins/auth/Register'
    const data = {
      email:values.email,password:values.confirmPass
    }
    axios.post(url,data).then((response)=>{
      //console.log(response)
      toast({
        title: 'success',
        description: response.data.message,
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
 
    }).catch(err=>{
      toast({
        title: 'An error occurred',
        description: err.response.data.err,
        status: 'error',
        duration: 7000,
        isClosable: true,
      })
     // console.log(err)
    })
    //console.log(values)
    resetForm({values:''})
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
    <Form className='loginCredentialsWrapper'  >
  
      <Box
      rounded={'lg'} bgColor='#e8fff4b5' boxShadow={'lg'} p={8} mb='10px'
      spacing={8} mx={'auto'} maxW={'lg'} w='100vw' mt='20px' borderRadius='25px'>
      
          <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
          <Stack spacing={4}>
     <Stack className='right'>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" focusBorderColor='green.400' name='email' value={values.email}  onChange={handleChange} onBlur={handleBlur}
             className={errors.email && touched.email ? "input-error" : null}/>
            </FormControl>
            {errors.email && touched.email ? (<span className='error'>{errors.email}</span>) : null}
            <FormControl id="createPassword" isRequired>
              <FormLabel>Create Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} name='createPass'value={values.createPass} onChange={handleChange} onBlur={handleBlur} focusBorderColor='green.400'
                className={errors.createPass && touched.createPass ? "input-error" : null} />
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
            {errors.createPass && touched.createPass ? (<span className='error'>{errors.createPass}</span>) : null}
            <FormControl id="confirmPassword" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} name='confirmPass' focusBorderColor='green.400' onChange={handleChange} onBlur={handleBlur} value={values.confirmPass} 
                  className={errors.confirmPass && touched.confirmPass ? "input-error" : null}
                />
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
            {errors.confirmPass && touched.confirmPass ? (<span className='error'>{errors.confirmPass}</span>) : null}
            <Stack spacing={10} pt={2}>
              <Button
                type='submit'
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                width='100%'
                className={dirty && isValid ? "" : "disabled-btn"}disabled={!(dirty && isValid)}
                _hover={{
                  bg: 'blue.500', 
                }}>
                Sign up
              </Button>
              </Stack>
        </Stack> 
        <Divider orientation='vertical'/>     
        <Stack className='left' display='flex'>
            <Center><Text fontSize='md' color='rgb(76, 76, 76)' p='10px'> or sign in with</Text></Center>
            <Center >
               <Button onClick={(e)=>{
                  e.preventDefault();
                  window.open('/api/auth/google');
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

         </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'} href='/auth/Login'>Login</Link>
              </Text>
        </Stack>
        </Stack>
      </Box>
      </Form>
  )
  }}
  </Formik>
  );
}










export default SignupCard