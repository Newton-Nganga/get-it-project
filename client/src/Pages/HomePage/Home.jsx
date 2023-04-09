import React,{useState} from 'react'
import '../../App.css'

import Hero from '../../Components/HeroSection/Hero'
import CommentSection from '../../Components/Comments/CommentSection'
import Footer,{CommentFormSection} from '../../Components/Footer/Footer'
import Tiles from '../../Components/HeroSectionTiles/Tiles'
import About from '../../Components/AboutUs/About'

export default function Home() {
  const [target,setTarget]=useState()
  const scrollToComponent=()=>{
  let offset = 100;
  window.scrollTo({
    behavior: "smooth",
    top: document.getElementById(target).getBoundingClientRect().top-
    document.body.getBoundingClientRect()
    -offset
  })
  }
  return (
    <div className='App'>
      <Hero setTarget={setTarget} scrollToComponent={scrollToComponent} />
      <Tiles/>
      <About id='About us'/>
      <CommentSection/>
      <CommentFormSection />
      <Footer id='footer'/>
    </div>
  )
}
