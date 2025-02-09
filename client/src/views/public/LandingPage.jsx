import React from 'react'

import { Routes, Route } from "react-router-dom";
import Hero from '../../components/Hero';
import { UserButton } from '@clerk/clerk-react';

const LandingPage = () => {
  return (
    <div className='w-screen min-h-screen'>
        <Hero />

    </div>
  )
}

export default LandingPage