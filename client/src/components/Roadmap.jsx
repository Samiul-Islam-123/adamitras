import React, { useEffect } from 'react'
import { FaMapSigns } from 'react-icons/fa';
import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import gsap from "gsap";
const Roadmap = () => {
  useEffect(() => {
    
    var tl = gsap.timeline();

    

    tl.to(".elem", {
            height: "100%",
            
            duration: 1.5,
            ease: "expo.inOut",
        })
        
        .to(".elem", {
            height: "0%",
            
            duration: 1,
            ease: "expo.inOut",
        })
        .to(".show",{
          onpacity: 1,
        })
}, []);
  const navigate = useNavigate();
  return (
    <div className='z-30 relative  w-screen h-screen bg-white flex px-8 py-16'>
      <div className=' elem absolute w-screen h-[50%] text-white top-0 left-0 z-30 bg-blue-500 flex flex-col items-center justify-center'>
      <FaMapSigns size={40} />
      <h1 className='text-center mt-2 text-4xl'>Roadmaps</h1>
      </div>
      <div className=' relative show opacity-0 w-full h-full'>
      <button className=' absolute left-5 top-5 p-2 rounded-full border border-black' onClick={()=>navigate('/career')}>
        <MdOutlineArrowBack size={25} />
      </button>
      <h2 className=' text-4xl md:text-8xl hurricane'>Roadmaps</h2>
      </div>
    </div>
  )
}

export default Roadmap