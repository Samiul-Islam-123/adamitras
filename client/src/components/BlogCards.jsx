import React from 'react'
import { FaRegNewspaper } from 'react-icons/fa'

const BlogCards = ({blog}) => {

    return (
        <div className='flex flex-col md:w-[20vw] md:h-[25vw] w-[40vw] h-[55vw] p-1 bg-[#FFF4CE] border border-[#EFC740] rounded-lg shadow-md mx-2 my-3'>
            <div className=' bg-white w-full h-1/2 rounded-md overflow-hidden'>
                <img src={blog.img} alt="" className=' w-full h-full object-cover object-center'/>
            </div>
            <div className=' lg:p-4  lg:pt-5 p-2'>
                <h4 className='lg:text-xl text-sm font-semibold'>{blog.title}</h4>
                <p className='text-xs text-gray-600 mt-2'>{blog.desc}</p>

            </div>
        </div>
    )
}

export default BlogCards