import React from 'react'
import Navbar from './component/Navbar'
import HeroSection from './component/HeroSection'
import AfricaAidSection from './component/AfricaAidSection'
import NewsletterSection from './component/NewsletterSection'
import BannerPage from './component/Banner'

const page = () => {
  return(
    <div>
      <Navbar/>
      <HeroSection/>
      <AfricaAidSection/>
      <BannerPage/>
      <NewsletterSection/>
    </div>
  )
}

export default page
 