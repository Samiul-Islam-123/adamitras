import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Panel from './component/Panel'
import Login from './component/Login'
import Signup from './component/Signup'
import { useUser } from '@clerk/clerk-react'
import './index.css'
const ProtectedRoute = ({ children }) => {
  const { isSignedIn } = useUser();


  return isSignedIn ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <Routes>

        <Route path="/" element={<Panel />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

      </Routes>
    </>
  )
}

export default App