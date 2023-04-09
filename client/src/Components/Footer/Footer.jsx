import React,{} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {Formik,Form} from 'formik'
import './Footer.css'
import Devpic from './profile-pic.png'
import {Textarea,Input,FormLabel,FormControl,Text,Box,Button,Avatar,useToast} from '@chakra-ui/react'
// import { AiFillTwitterCircle } from 'react-icons/ai'
// import {CgPhone} from 'react-icons/cg'
// import {SiGmail} from 'react-icons/si'
import {GrSend} from 'react-icons/gr'

function Footer() {
  return (
    <div>
        <FooterElement/>
        {/* <CommentSection/> */}
    </div>
  )
}


//The footer section Component//
const FooterElement=()=>{
    
    return(
        <Box 
        display='flex'
        p='30px'
        className='Footer-Element'>
           <Contacts/>
           <Developer/>
           <SignUpUsers/>
        </Box>
    )
}
 const Contacts=()=>{
     return(
     <Box 
      id='Contacts'
      className='ContactUs Footer-Box'>
     <Text 
     className='Section-Text'
     >Contact Us</Text>
     <Text display='inline-flex' >Call: +2547-0264-7008</Text><br/>
     <Text display='inline-flex' >Email: nganga7newt@gmail.com </Text><br/>
     <Text  display='inline-flex' >Whatsapp :+2547-1279-0680</Text><br/>
     </Box>
     )
 }
 const Developer=()=>{
     return(
         <Box
          className='Developer Footer-Box'>
           <Text textAlign='center' color='rgb(194 194 194)' fontSize={'1.7em'} fontWeight="500"
          //  className='Section-Text'
           >Meet ,Newton!</Text>
           <Text>The developer behind get-it.com</Text>
           <Avatar
               className='DevImage'
               boxSize='100px'
               src={Devpic}
               alt="Newton Nganga the dev"
               loading='lazy'
           />
           <Text><i>Newton Ng'ang'a</i></Text>
         </Box>
     )
 }
 const SignUpUsers=()=>{
    let navigate = useNavigate();

     return(
         <Box 
         className='Footer-Box'>
         <Text
         className='Section-Text'
         >Want to join us?</Text>
        
            <Button
             display='block'
             m='10px auto'
             size='md'
             height='48px'
             width='200px'
             borderRadius='25px'
             colorScheme='yellow'
             onClick={()=>navigate('/auth/Register')}
             >Register</Button>
            <Button
             display='block'
             m='10px auto'
             size='md'
             height='48px'
             width='200px'
             borderRadius='25px'
             bgColor='white'
            color='black'
             onClick={()=>navigate('/auth/Login')}
             >Login</Button>
         
         </Box>
   
     )
 }

 


//The comment sectionComponent//


const CommentText=()=>{
    return(
       <Box 

         className='Comment-Text'>
        <Text
        color='rgb(21,19, 33)'
        fontSize='4xl'
        fontWeight={900}
        align='center'
        >Give us a comment..</Text>
       </Box>
     
       
    )
}

const CommentFormSection =()=>{
    return(
        <Box  className='CommentSectionWrapper'>
        <Box className='InputFormWrapper'>
           {/* <CommentHeaderText/> */}

           <CommentText/>
           
                <CommentInputForm/>
           
        </Box>
        </Box>
        
    )
}

const initialValues={
  from:'',email:'',comment:''
}


const Validate=(values)=>{
let errors={}
const Yup_email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

if(!values.from){
  errors.from="Your name is required"
}else if((values.from.length >20 )){
  errors.from ='Your name is too long'
}else if(values.from.length < 2)
{errors.from='your name is too short'}
if(!values.email){
  errors.email="Your email is required"
}else if(!Yup_email.test(values.email)){
  errors.email ='invalid email'
}
if(!values.comment){
  errors.comment="Your comment is required"
}else if(values.comment.length < 5){
  errors.comment ='The comment is too short'
}else if(values.comment.length > 200){
  errors.comment ='The comment is too long'
}
return errors;

}

const CommentInputForm=()=>{
const toast= useToast()
    return(
      <Formik
      initialValues={initialValues}
      validate={Validate}
      onSubmit={(values,{resetForm})=>{
      const url='/api/comments/create'
      const data = values
      axios.post(url,data).then((res)=>{
      //alert('successfully created comment')
      //console.log(res)
      toast({
        title: 'success',
        description: res.data.message,
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      resetForm({values:''});
      }).catch(err=>{
      //console.log(err)
      toast({
        title: 'An error occurred',
        description: "Comment was not created!",
        status: 'error',
        duration: 7000,
        isClosable: true,
      })
      })
     //console.log(values)
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
        <Form className='inputForm'>
        <FormControl isRequired>
           <FormLabel
               htmlFor='userName'>Name:</FormLabel>
           <Input
            required
            type='text'
             name='from'
             borderRadius='15px'
             onChange={handleChange}
             value={values.from}
             onBlur={handleBlur}
             className={errors.from && touched.from ? "input-error" : null}
             placeholder='Enter your name'
             id='userName'  
           ></Input>
           </FormControl>
           {errors.from && touched.from ? (<span className='error'>{errors.from}</span>) : null}
           <FormControl isRequired>
           <FormLabel
             htmlFor='userEmail'
           >Email:</FormLabel>
           <Input
             required
             name='email'
             borderRadius='15px'
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
             type='email'
             placeholder='Enter your email'
             id='userEmail'
             className={errors.email && touched.email ? "input-error" : null}
           />
           </FormControl>
           {errors.email && touched.email ? (<span className='error'>{errors.email}</span>) : null}
           <FormControl isRequired>
           <FormLabel htmlFor='Textarea'>Comment:</FormLabel>
           <Textarea
           
            required
            name='comment'
            id='Textarea'
            mt='1rem'
             borderRadius='15px'
             onChange={handleChange}
             onBlur={handleBlur}
            value={values.comment}
            className={errors.comment && touched.comment ? "input-error" : null}
             width='-webkit-fill-available'
             placeholder='Tell us your thought...'
           />
           </FormControl>
           {errors.comment && touched.comment ? (<span className='error'>{errors.comment}</span>) : null}
           <Button
           type='submit'
           w='-webkit-fill-available'
           m='10px 0'
           color='black'
           rightIcon={<GrSend/>}
           lineHeight='1.9'
           padding='0 30px'
           fontSize='1.5em'
           size='xl'
           borderRadius='25px'
           bgColor='orange'
           colorScheme='Orange'
           className={dirty && isValid ? "" : "disabled-btn"}disabled={!(dirty && isValid)}
           >Send</Button>
        </Form>
        )
      }}
    </Formik>
    )} 





export default Footer
export {CommentFormSection}
