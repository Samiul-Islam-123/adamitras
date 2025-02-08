import React from 'react'

const Pyq = () => {
  return (
    <section className=' w-screen h-screen relative'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 md:w-[40%] w-[85%] border-[#EFC740] border-2 shadow-md shadow-black/20 flex items-center justify-center flex-col gap-5 rounded-3xl  bg-[#FFF4CE] py-20 '>
          <h1 className=' text-3xl mb-5 font-bold text-[#f5c72f]'>Select Your Need</h1>
          <select className=' w-[200px] border-[#EFC740] border-2 py-2 px-4 rounded-xl'  name="" id="">
          <option value="" disabled selected>Select Semester</option>
          </select>
          <select className=' w-[200px] py-2 border-[#EFC740] border-2 px-4 rounded-xl'  name="" id="">
          <option value="" disabled selected>Select Subject</option>
          </select>
          <button className=' w-[200px] shadow-sm shadow-white/20 text-white bg-[#f5c72f] py-2 px-4 rounded-xl'>
            Done
          </button>
        </div>

        
    </section>
  )
}

export default Pyq