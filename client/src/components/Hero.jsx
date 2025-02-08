import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserButton, UserProfile, useUser } from '@clerk/clerk-react';
import Nav from './Nav';
import Home from './Home';
import Blogs from './Blogs';
import Pyq from './Pyq';
import Career from './Career';
import Login from './Login';
import Signup from './Signup';

const ProtectedRoute = ({ children }) => {
    const { isSignedIn } = useUser();


    return isSignedIn ? children : <Navigate to="/login" />;
};

const Hero = () => {

    const {user} = useUser();

    useEffect(() => {
        if(user){
            console.log(user)
        }
    },[user])

    return (
        <section>

            <UserButton />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                

                <Route path="/blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
                <Route path="/pyqs" element={<ProtectedRoute><Pyq /></ProtectedRoute>} />
                <Route path="/career" element={<ProtectedRoute><Career /></ProtectedRoute>} />
            </Routes>
            <Nav />
        </section>
    );
};

export default Hero;
