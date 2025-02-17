import React, { useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import Hero from "../../components/Hero";
import { UserButton } from "@clerk/clerk-react";
import About from "../../components/About";
import gsap from "gsap";

const LandingPage = () => {
  
    
    return (
      <>
            
        <div className=" min-h-screen overflow-x-hidden ">
            <Hero />
            <About />
        </div>
      </>
    );
};

export default LandingPage;
