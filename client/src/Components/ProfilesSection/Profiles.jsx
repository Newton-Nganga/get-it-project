import React, { useEffect,useState} from 'react'
import './profiles.css'
import axios from 'axios'
import {Box,FormLabel,useToast,Text,ButtonGroup,Button,Avatar,Textarea,Input,Popover,PopoverBody,PopoverCloseButton,PopoverArrow,PopoverTrigger,PopoverContent, FormControl} from '@chakra-ui/react'
import {FiPhoneCall} from 'react-icons/fi'
import {BsChatSquareText,BsWhatsapp} from 'react-icons/bs'
import {MdOutlineMailOutline} from 'react-icons/md'
import {GoLocation} from 'react-icons/go'
import Navigation from '../Navbar/Navigation'
import {Form,Formik} from 'formik'
//search bar/filter

const Validate=(values)=>{
  const errors={}
    const Yup_email =/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
   
    if(!values.from){
      errors.from="your email is required"
    }else if(!Yup_email.test(values.from)){
      errors.from ='your email is invalid!'
    }
    if(!values.title){
      errors.title="The subject is missing"
    }
    if(!values.content){
        errors.content="your text is required"
    }else if(values.content >= 30){
      errors.content ="This text is too long"
    }
    return errors
}



function Profiles() {
const toast = useToast()
const initialValues ={from:'',title:'',content:''}

const [data,setData] =useState([]);
useEffect(()=>{
const fetchData = async()=>{
const dataFetched = await axios.get('/api/profiles')

  // .then((data)=>{
    setData(dataFetched.data.data)
    console.log(data)
  // })
  // .catch((err)=>{
  //   console.log(err) 
  // })
}
fetchData();
},[data])


  return (
    // <Profiles
    //   data={data}
    // />
    <>
    <Box id='Navigation'><Navigation/></Box>
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
        <Formik
      initialValues={initialValues}
      validate={Validate}
     onSubmit={(values,{resetForm})=>{
     const dataSent={to:data.email,from:values.from,content:values.content,title:values.title}
      console.log(dataSent)
       axios.post('/api/inbox/create',dataSent)
          .then((res)=>{
            console.log(res)
            toast({
              title: 'success',
              description: res.data.message,
              status: 'success',
              duration: 1000,
              isClosable: true,
            })
          })
          .catch(err=>{
            toast({
              title: 'An error occurred',
              description: "your text was not sent",
              status: 'error',
              duration: 7000,
              isClosable: true,
            })
            console.log(err)
          })
        resetForm();
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
        <FormControl>
        <FormLabel>From</FormLabel>
        <Input name='from' onChange={handleChange} placeholder='your-email@example.com' handleBlur={handleBlur} value={values.from}
          className={errors.from && touched.from ? "input-error" : null}
        />
        </FormControl>
        {errors.from && touched.from ? (<span className='error'>{errors.from}</span>) : null}
        <FormControl>
        <FormLabel>Title</FormLabel>
        <Input name='title' onChange={handleChange} placeholder='subject matter' handleBlur={handleBlur}  value={values.title}
          className={errors.title && touched.title ? "input-error" : null}
        />
        </FormControl>
        {errors.title && touched.title ? (<span className='error'>{errors.title}</span>) : null}
        <FormControl>
        <FormLabel>message</FormLabel>
        <Textarea name='content' onChange={handleChange} placeholder='your text'  handleBlur={handleBlur} value={values.content}
         className={errors.content && touched.content ? "input-error" : null}
        />
        </FormControl>
        {errors.content && touched.content ? (<span className='error'>{errors.content}</span>) : null}
        <Button type='submit' w='-webkit-fill-available' mt='10px' borderRadius={'20px'} bgColor='yellow.400'
        className={dirty && isValid ? "" : "disabled-btn"}disabled={!(dirty && isValid)}
        >Send</Button>
        </Form>
        )}}
        </Formik>
       
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
        </>
      )
    }
export default Profiles