import React, { useEffect } from "react";
import LandingPage from "./views/public/LandingPage";
import RoutesManager from "./RoutesManager";
import { UserButton } from "@clerk/clerk-react";
import gsap from "gsap";
import logo from '/assets/logo.png'


const App = () => {
  
    return (
        <>
            
            <div className=" z-10 w-full h-fit fixed top-0 left-0 flex items-center justify-between bg-white px-5 py-3">
                <div className=" flex gap-3 items-center "><img src={logo} className=" h-8" alt="" /><h2 className="text-xl font-extralight text-gray-900 ">Adamitras</h2></div>
                <div></div>
                <div>
                    <UserButton />
                </div>
            </div>

            <RoutesManager />
        </>
    );
};

export default App;
