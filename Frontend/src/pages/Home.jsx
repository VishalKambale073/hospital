import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import TopDoctors from '../components/TopDoctors'

const Home = () => {
  let user = "patient"
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      {
        user == "patient"? <TopDoctors/> : " "
      }
    
    </div>
  )
}

export default Home