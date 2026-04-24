import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductView from './components/ProductView'
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/all';
import Showcase from './components/Showcase';

gsap.registerPlugin(ScrollTrigger)

const App = () => {
  return (
    <>
     <Navbar/>
     <Hero/>   
     <ProductView/>
     <Showcase/>
    </>
    
  )
}

export default App