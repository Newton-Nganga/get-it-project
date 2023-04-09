import React, { useState,useEffect } from 'react'
import '../Profile/UserProfile.css'
import {Box,Stack,Button,HStack,Avatar,InputGroup,FormControl, Textarea,Link,
Input,FormLabel,Heading,useToast,Popover,ButtonGroup,Text,PopoverArrow,PopoverTrigger,
PopoverBody,PopoverContent,PopoverCloseButton
} from '@chakra-ui/react'
import {Formik,Form} from 'formik'
import axios from 'axios'
import Navigation from '../../Navbar/Navigation'
import {Validate,Counties,Categories} from '../Profile/resources'
// import { useNavigate } from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import {FiPhoneCall} from 'react-icons/fi'
import {BsChatSquareText,BsWhatsapp} from 'react-icons/bs'
import {MdOutlineMailOutline} from 'react-icons/md'
import {GoLocation} from 'react-icons/go'
import {RiDeleteBin6Line} from 'react-icons/ri'




 const CreateAd=()=>{
  const userEmail=window.localStorage.getItem('email')
  const [dataObject,setData]=useState({})
  useEffect(()=>{
  const fetchData=async()=>{
   await axios.get(`/api/profiles/find/${userEmail}/email`)
    .then(
     (res)=>{
       setData(res.data.data[0]);}
    )
    .catch((err)=>{
     if(err.response.status === 404){
      setData(null)
     }
     console.log('An error was caught')
    })
 }
 fetchData();
},[dataObject])

    return (
      <Box className='UserAccountComponent'>
        <Box className='Navbar-Section'>
        <Navigation />
        </Box>
        <Box className='userDashboard'>
        {/* <UserprofileAd/> */}
        {(dataObject === null || !dataObject)?<UserprofileAd/>:<ExistingAd data={dataObject}/> }
        </Box>
      </Box>
    )
  
}
const initialValues={
  image:'',fName:'',lName:'',location:'',category:'',age:'',email:'',gender:'',phone:'',whatsapp:'',bio:''
}

const UserprofileAd=()=>{
  // const handleFileUpload=
 const toast = useToast();
  const submitForm=(values)=>{
  
const url="/api/profiles/create/"
const formData = new FormData();
for (let value in values) {
  formData.append(value, values[value]);
}
axios.post(url,formData).then((res)=>{
  console.log(res)
  toast({
   title: 'Great ,success',
   description: res.data.message,
   status: 'success',
   duration: 4000,
   isClosable: true,
 })
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
  <Box><Box display='flex' alignItems={'left'} p='10px'><Button as={Link} href='/user/Account' ><FiArrowLeft/>Back</Button></Box>

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
     
<Heading textAlign={'center'}>User Ad</Heading>
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
   >Generate your Ad</Button>
 </HStack>
</Form>
</Box>
)}}
</Formik>
</Box>
)
}

const ExistingAd=(data)=>{
//  console.log(data)
const toast =useToast()


function HandleDelete(props){
  console.log(props)
   const id=props
   const confirmed = window.confirm('Are you sure you want to delete this message?')
 if (confirmed){
 
   const url=`/api/profiles/delete/${id}`
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
//console.log(data.data)
  return (
    // <Profiles
    //   data={data}
    // />

      <Box className='Profile-Section'>
   <Box display='flex' alignItems={'left'} p='10px'><Button as={Link} href='/user/Account' ><FiArrowLeft/>Back</Button></Box>
    
        <Box className='Profile-Card' bgColor='inherit'> 
        <Box className='Profile-Image'>
        <Avatar size='xl' src={data.data.image}></Avatar>
          </Box>
           <Box className='Details-Container'>
          <Text className='Name-Section'>{data.data.fName} {data.data.lName}</Text>
          <Text className='Location-Section'><GoLocation/>{data.data.location}</Text>
          <Text>Age: {data.data.age}</Text>
          <Text>Gender:{data.data.gender}</Text>
         </Box>
           <Box className='Profile-Info'>
          <Box className='Bio-Section'>
          <Text className='Bio-Section'>{data.data.bio}</Text>
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
        call : {data.data.phone}
         </PopoverBody>
      </PopoverContent>
      </Popover>
      <Popover isLazy>
         <PopoverTrigger>
         <Button className='buttons' disabled  bgColor='white'><BsChatSquareText style={{color:'blue',fontSize:'20px'}}/></Button>
          </PopoverTrigger>
        <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
        call : {data.data.phone}
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
        email : {data.data.email}
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
        whatsapp : {data.data.whatsapp}
         </PopoverBody>
      </PopoverContent>
      </Popover>
         </ButtonGroup>
        </Box>
          </Box>
          </Box>
          <Text textAlign={'right'} mr='30px'><Text w='fit-content' bgColor={'#ffd2d2'} as={Button} p='10px'  fontSize={'1.5rem'} onClick={(e)=>{
                  e.preventDefault();
                  HandleDelete(data.data._id)
                }}>Delete this Ad <RiDeleteBin6Line fill='red'  m='0 auto'/></Text></Text>
        </Box>
      )
    }


export default CreateAd