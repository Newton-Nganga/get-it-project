
import React from 'react'
import {Box,FormControl,Heading, Textarea,Image,Input,FormLabel,Button,useToast}from '@chakra-ui/react'
import {Form,Formik} from 'formik'
import Navigation from '../../Components/Navbar/Navigation'
import ContactImage from './contactus.png'
import './Contact.css'
import axios from 'axios'


const initialValues={fName:'',lName:'',email:'',subject:"",message:''}

const Validate=(values)=>{
    let errors={}
    const Yup_email =/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
   
    if(!values.email){
      errors.email="your email is required"
    }else if(!Yup_email.test(values.email)){
      errors.email ='your email is invalid!'
    }
    if(!values.fName){
      errors.fName="your first name is required"
    }else if(values.fName.length < 3){
        errors.fName="Your name is too short"
    }
    if(!values.lName){
        errors.lName="your last name is required"
    }else if(values.lName.length < 3){
        errors.lName="Your name is too short"
    }
    if(!values.subject){
        errors.subject="The subject is required"
      }
    if(!values.message){
        errors.message="message can't be empty"
      }
    return errors;
    
    }

export default function ContactUs() {
    const toast=useToast()
    const handleSubmit=(values,{resetForm})=>{
     const data={fName:values.fName,lName:values.lName,email:values.email,subject:values.subject,message:values.message}
     const url ='http:localhost:3001/api/contact/admin/create'
     axios.post(url,data).then(res=>{
        toast({
            title: 'success',
            description: "message was sent successfully",
            status: 'success',
            duration: 1000,
            isClosable: true,
          })
     }).catch(err=>{
        toast({
            title: 'An error occurred',
            description: "message not sent!",
            status: 'error',
            duration: 7000,
            isClosable: true,
          })
     })
    }
  return (
    <Box className='Contact wrapper'>
    <Box className='NavigationComponent' p='0' fontSize='inherit'>
        <Navigation/>
    </Box>
    <Box display='block' m='0 auto' p='1rem' color={'#131a13'} textAlign='center' > <Heading>Contact us</Heading></Box>
    <Box className='ContactComponent'>
      <Box display='inline-block' className='FormComponent'>
      <Formik
      initialValues={initialValues}
      validate={Validate}
      onSubmit={handleSubmit}
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
      <Form >
      <FormControl>
                <FormLabel>First name</FormLabel>
            <Input type='text' name='fName' onChange={handleChange} onBlur={handleBlur} isRequired value={values.fName}
            className={errors.email && touched.fName ? "input-error" : null}
            />
        </FormControl>
        {errors.fName && touched.fName ? (<span className='error'>{errors.fName}</span>) : null}
        <FormControl>
          <FormLabel>Last name</FormLabel>
            <Input type='text' name='lName' onChange={handleChange} onBlur={handleBlur} isRequired value={values.fName}
                 className={errors.lName && touched.lName ? "input-error" : null}
            />
        </FormControl>
        {errors.lName && touched.lName ? (<span className='error'>{errors.lName}</span>) : null}
        <FormControl>
          <FormLabel>Email:</FormLabel>
            <Input type='text' name='email' onChange={handleChange} onBlur={handleBlur} isRequired value={values.fName}
                 className={errors.email && touched.email ? "input-error" : null}
            />
        </FormControl>
        {errors.email && touched.email ? (<span className='error'>{errors.email}</span>) : null}
        <FormControl>
          <FormLabel>About:</FormLabel>
            <Input type='text' name='subject' onChange={handleChange} onBlur={handleBlur} isRequired value={values.fName}
                 className={errors.subject && touched.subject ? "input-error" : null}
            />
        </FormControl>
        {errors.subject && touched.subject ? (<span className='error'>{errors.subject}</span>) : null}
        <FormControl>
          <FormLabel>Message:</FormLabel>
            <Textarea  name='message' onChange={handleChange} onBlur={handleBlur} isRequired value={values.fName} 
            className={errors.message && touched.message ? "input-error" : null}

            />
        </FormControl>
        {errors.message && touched.message ? (<span className='error'>{errors.message}</span>) : null}
        <Button type='submit' backgroundColor='#1b83fe' m='10px 0' p='23px' fontSize='1.2em' w='-webkit-fill-available' borderRadius={'25px'}
        className={dirty && isValid ? "" : "disabled-btn"}disabled={!(dirty && isValid)}
        >Send</Button>

      </Form>)
    }}
      </Formik>
      
      </Box>
      <Box className='ImageComponent'>
        <Image src={ContactImage} alt='...'/>
      </Box>
    </Box>
    </Box>
  )
}
