import React from 'react'
import Nav from '../../components/Nav'
import { Routes, Route } from "react-router-dom";
import Hero from '../../components/Hero';

const LandingPage = () => {
  return (
    <div className='w-screen min-h-screen'>
        <Nav />
        <Hero />

    </div>
  )
}

export default LandingPage