import React, { useEffect,useState } from 'react'
import axios from 'axios'
import {Box,Text} from '@chakra-ui/react'
import './CommentSection.css'
import {ImQuotesLeft,ImQuotesRight} from 'react-icons/im'

import Slider  from 'react-slick'

const settings = {
    dots: false,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

export default function CommentSection() {
  return (
    <Box className='CommentSection'>
    <Text
    id='CommentHeader'
    >What people are saying..</Text>
        <CommentShape/>
       
    </Box>
  )
}
const CommentShape=()=>{
    return(
<Box className='Comment-Shape'>

<Text id='QuoteIconRight'><ImQuotesLeft /></Text>
<Comment/>
<Text id='QuoteIconLeft'><ImQuotesRight /></Text>
</Box>
    )
}

const Comment=()=>{
      const [comment,setComment] = useState([])
      useEffect(()=>{
        setTimeout(
         axios.get("/api/comments/").then((res)=>{
          let data = res.data.data
          setComment(data)
          //console.log(data)
         }).catch((err)=>{
          console.log("error occurred during fetching of data")
         })
        ,5000)
        },[])
    return(
        <Box className='Comment'>
        <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />

      <Slider {...settings} >
      {comment.map((user, index) => (
       
        <Box key={index} maxWidth='500px' margin='0 auto'> 
        <Text>
             {user.comment}
           </Text>
           <Text fontWeight={600} pt='10px'>By {user.from}</Text>
        </Box>
        ))}
      </Slider>

    </Box>
        
    )
}



