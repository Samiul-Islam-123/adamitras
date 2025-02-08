import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './Home';
import Blogs from './Blogs';
import Pyq from './Pyq';
import Career from './Career';

const Hero = () => {
    return (
        <section className=' w-screen h-screen'>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/blogs" element={<Blogs/>} />
                <Route path="/pyqs" element={<Pyq/>} />
                <Route path="/career" element={<Career/>} />
            </Routes>
        </section>
    )
}

export default Hero