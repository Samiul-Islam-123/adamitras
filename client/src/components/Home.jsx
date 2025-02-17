import React, { useEffect } from "react";
import gsap from "gsap";
import bg from "/assets/bg2.png"

const Home = () => {
    

    return (
        <section className=" w-screen h-screen justify-center items-center flex flex-col overflow-hidden">
            
            <img className=" absolute lg:top-[20vh] md:top-[15vh] -z-10 md:w-[25vw] w-[70vw] " src={bg} alt="" />
            <span className=" md:-mt-20 ">
                
                <h1 className=" md:text-[8.5vw] text-[20vw] mb-2 vina-sans bg-[url('/assets/txtbg.png')] bg-cover bg-center opacity-95  bg-clip-text text-transparent ">Adamitras</h1>
            </span>
            <p className=" md:text-[2.2vw] text-[6vw] mb-10 hurricane">Your Digital Senior</p>
        </section>
    );
};

export default Home;
