import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductView from './components/ProductView'
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/all';

gsap.registerPlugin(ScrollTrigger)

const App = () => {
  return (
    <>
     <Navbar/>
     <Hero/>   
     <ProductView/>
    </>
    
  )
}

export default App