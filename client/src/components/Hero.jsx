import React from 'react'
import { Routes, Route } from "react-router-dom";
import Nav from './Nav';
import Home from './Home';
import Blogs from './Blogs';
import Pyq from './Pyq';
import Career from './Career';


const Hero = () => {
    return (
        <section >
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/blogs" element={<Blogs/>} />
                <Route path="/pyqs" element={<Pyq/>} />
                <Route path="/career" element={<Career/>} />
            </Routes>
            <Nav />
        </section>
    )
}

export default Hero