import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './views/public/LandingPage'
import Login from './components/Login'
import Signup from './components/Signup'
import Roadmap from './components/Roadmap'
import InternshipOpportunities from './components/InternshipOpportunities'
import Events from './components/Events'
import EventDetails from './components/EventDetails'

function RoutesManager() {
  return (
    <>
        <Routes>

            <Route path="/*" element={<LandingPage />} />
            <Route path="/roadmaps" element={<Roadmap />} />
            <Route path="/internship-opportunities" element={<InternshipOpportunities />} />
            <Route path="/event" element={<Events />} />
            <Route path="/event/:id" element={<EventDetails />} />

            
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            
        </Routes>
    </>
  )
}

export default RoutesManager