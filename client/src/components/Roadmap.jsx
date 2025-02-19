import React from 'react'
import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
const Roadmap = () => {
  const navigate = useNavigate();
  return (
    <div className='z-30 relative  w-screen h-screen bg-white flex px-8 py-16'>
      <button className=' absolute left-5 top-5 p-2 rounded-full border border-black' onClick={()=>navigate('/career')}>
        <MdOutlineArrowBack size={25} />
      </button>
      <h2 className=' text-4xl md:text-8xl hurricane'>Roadmaps</h2>
    </div>
  )
}

export default Roadmap