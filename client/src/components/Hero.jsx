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
import axios from "axios";
import Cookies from "js-cookie"
import Others from './Others';
import About from './About';
import BlogDetails from './BlogDetails';


const ProtectedRoute = ({ children }) => {
    const { isSignedIn } = useUser();


    return isSignedIn ? children : <Navigate to="/login" />;
};

const Hero = () => {

    const { user } = useUser();

    const SaveUserData = async (userData) => {

        

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/save-user`,
                userData
            );

            // Check the response for success
            if (!response.data.success) {
                alert(response.data.message);
            } else {
                console.log("Server response : ", response.data);
                Cookies.set('token', response.data.token);
            }
        } catch (error) {
            console.error("Error saving user data:", error);

            // Show a user-friendly error message
            alert("An error occurred while saving user data. Please try again.");
        }
    }

    useEffect(() => {
        if (user) {
            const emailVerified = user.emailAddresses.some(
                (email) => email.verification.status === "verified"
              );
            const userData = {
                username: user.fullName || user.username || "Anonymous",
                email: user.primaryEmailAddress?.emailAddress,
                isVerified: emailVerified,
                avatarURL: user.imageUrl || "",
              };
            SaveUserData(userData);
        }
    }, [user])

    return (
        <section className=' overflow-clip'>
            

            
            

            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />

                {/* <Route path="/blogs" element={<Blogs />} /> */}
                {/* <Route path="/blogs/:id" element={<BlogDetails />} /> */}
                
                <Route path="/pyqs" element={<ProtectedRoute><Pyq /></ProtectedRoute>} />
                <Route path="/career" element={<Career />} />
                {/* <Route path="career/*" element={<ProtectedRoute><CareerRoutes /></ProtectedRoute>} /> */}
            </Routes>
            <Nav />
        </section>
    );
};

export default Hero;
