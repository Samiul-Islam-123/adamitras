import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './views/public/LandingPage'
import Login from './components/Login'
import Signup from './components/Signup'

function RoutesManager() {
  return (
    <>
        <Routes>

            <Route path="/*" element={<LandingPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            
        </Routes>
    </>
  )
}

export default RoutesManager