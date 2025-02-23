import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './views/public/LandingPage'
import Login from './components/Login'
import Signup from './components/Signup'
import Roadmap from './components/Roadmap'
import InternshipOpportunities from './components/InternshipOpportunities'
import Events from './components/Events'

function RoutesManager() {
  return (
    <>
        <Routes>

            <Route path="/*" element={<LandingPage />} />
            <Route path="/roadmaps" element={<Roadmap />} />
            <Route path="/internship-opportunities" element={<InternshipOpportunities />} />
            <Route path="/events" element={<Events />} />
            
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            
        </Routes>
    </>
  )
}

export default RoutesManager