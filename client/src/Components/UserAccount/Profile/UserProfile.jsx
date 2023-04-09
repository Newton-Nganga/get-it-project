import React from 'react'
import './UserProfile.css'
import {Box,Stack,Button,HStack,Avatar,InputGroup,FormControl, Textarea,Link,
Input,FormLabel,Heading,useToast
} from '@chakra-ui/react'
import {Formik,Form} from 'formik'
import axios from 'axios'
import Navigation from '../../Navbar/Navigation'
import {Validate,Counties,Categories} from './resources'
import { useNavigate } from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'

const initialValues={
  image:'',fName:'',lName:'',location:'',category:'',age:'',email:'',gender:'',phone:'',whatsapp:'',bio:''
}


const UserProfile=()=>{
    return (
      <Box className='UserAccountComponent'>
        <Box className='Navbar-Section'>
        <Navigation />
        </Box>
        <Box display='flex' alignItems={'left'} p='10px'><Button as={Link} href='/user/Account' ><FiArrowLeft/>Back</Button></Box>
        <Box className='userDashboard'>
        <UserAccountDashboard/>
        </Box>
      </Box>
    )
  
}

const UserAccountDashboard=()=>{
  // const handleFileUpload=
  const navigate =useNavigate()
 const toast = useToast();
  const submitForm=(values)=>{
  
    const url="/api/accounts/create/"
     const formData = new FormData();
     for (let value in values) {
       formData.append(value, values[value]);
     }
     axios.post(url,formData).then((res)=>{
      //  console.log(res)
       toast({
        title: 'Great ,success',
        description: res.data.message,
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
      navigate('/user/Account')
     }).catch(err=>{
      toast({
        title: 'An error occurred',
        description: err.response.data.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
       console.log(err)
     })
   }
return(
  <Formik
  initialValues={initialValues}
  validate={Validate}
  onSubmit={submitForm}
>
  {(formik) => {
    const {
      values,
      handleChange,
      errors,
      touched,
      handleBlur,
      isValid,
      dirty,
    } = formik;
   return(
    <Box className='dashboardWrapper' boxShadow={'lg'} borderRadius={'lg'}>
  <Heading textAlign={'center'}>User account profile</Heading>
    <Form encType='multipart/form-data'>
    <Box className='insideForm'>
      <Stack alignItems={'center'} w='50%' display='inline-flex'>
      <FormControl isRequired>
      <InputGroup display='inline'>
         <Avatar size={'md'} name={values.fName} id="avatar" src={values.image} alt='...'/>
         <Input name='image' accept='image/*'  type='file' w='auto' h='auto' borderStyle={'none'} 
       onChange={(e) =>
            formik.setFieldValue('image', e.currentTarget.files[0])}
      //  onChange={handleChange}

        />
         </InputGroup>
      </FormControl>
      </Stack>
      <Stack w='50%' display='inline-flex'>
        <FormControl isRequired> 
        <FormLabel>First Name:</FormLabel>
        <Input name='fName' placeholder="First Name:" onChange={handleChange} onBlur={handleBlur} value={values.fName}/>
        </FormControl>
        {errors.fName && touched.fName ? (<span className='error'>{errors.fName}</span>) : null}
        <FormControl isRequired> 
        <FormLabel>Last Name:</FormLabel>
        <Input name="lName" placeholder="Last Name:" onChange={handleChange} onBlur={handleBlur} value={values.lName}/>
        </FormControl>
        {errors.lName && touched.lName ? (<span className='error'>{errors.lName}</span>) : null}
        <FormControl isRequired> 
        <FormLabel>County/Location:</FormLabel>
        <Input name="location" placeholder="location:" onChange={handleChange} onBlur={handleBlur} value={values.location} list='Counties'/>
         <datalist id='Counties'>
         {Counties.map((county,index)=>{
          return(<option key={index}value={`${county} county`}>{county} county</option>)
         })}
         </datalist>
        </FormControl>
        {errors.location && touched.location ? (<span className='error'>{errors.location}</span>) : null}
        <FormControl>
        <FormLabel>Category:</FormLabel>
        <Input name="category" placeholder="Category:" onChange={handleChange} onBlur={handleBlur} value={values.category} list='Categories'/>
         <datalist id='Categories'>
         {Categories.map((item,index)=>{
          return(<option key={index}value={`${item}`}>{item}</option>)
         })}
         </datalist>
        </FormControl>
        {errors.category && touched.category ? (<span className='error'>{errors.category}</span>) : null}
      </Stack>
      </Box>
      <Stack>
      <FormControl>
        <FormLabel>Age:</FormLabel>
         <Input name="age" placeholder="Age:" type='number' onChange={handleChange} onBlur={handleBlur} value={values.age}/>
        </FormControl>
        {errors.age && touched.age ? (<span className='error'>{errors.age}</span>) : null}
        <FormControl>
        <FormLabel>Gender:</FormLabel> <Input name="gender" as="select" placeholder="Gender:" onChange={handleChange} onBlur={handleBlur} value={values.gender}>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
        </Input>
        </FormControl>
        {errors.gender && touched.gender ? (<span className='error'>{errors.gender}</span>) : null}
      <FormControl>
       <FormLabel>Email:</FormLabel> 
      <Input name='email' type='email' placeholder="Email:" onChange={handleChange} onBlur={handleBlur} value={values.email}/>
      </FormControl>
       {errors.email && touched.email ? (<span className='error'>{errors.email}</span>) : null}
        <FormControl> 
         <FormLabel>Phone:</FormLabel>
        <Input name='phone' type='tel' placeholder="0712...."onChange={handleChange} onBlur={handleBlur} value={values.phone}/>
        </FormControl>
        {errors.phone && touched.phone ? (<span className='error'>{errors.phone}</span>) : null}
        <FormControl>
         <FormLabel>Whatsapp:</FormLabel> 
        <Input name='whatsapp' type='tel' placeholder="0712...:"onChange={handleChange} onBlur={handleBlur} value={values.whatsapp}/>
        </FormControl>
        {errors.pass && touched.pass ? (<span className='error'>{errors.pass}</span>) : null}
      </Stack>
      <Stack>
      <FormLabel>Bio:</FormLabel>
      <Textarea name='bio' type='text' placeholder='Something about you' onChange={handleChange} onBlur={handleBlur} value={values.about}/>
      {errors.bio && touched.bio ? (<span className='error'>{errors.bio}</span>): null}
      </Stack>
      <HStack p='20px 0'>
        <Button
        w=' -webkit-fill-available'
         type='submit'
        className={dirty && isValid ? "" : "disabled-btn"}disabled={!(dirty && isValid)}
        >Create your profile</Button>
      </HStack>
    </Form>
    </Box>
    )}}
  </Formik>
)
}

export default UserProfile