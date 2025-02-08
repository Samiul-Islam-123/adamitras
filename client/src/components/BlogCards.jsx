import React from 'react'
import { FaRegNewspaper } from 'react-icons/fa'

const BlogCards = (blog) => {
    return (
        <div className='flex flex-col w-[20vw] h-[25vw] items-center justify-center p-10 bg-gray-100 border border-black rounded-lg shadow-md'>
            <FaRegNewspaper className='text-4xl mb-4 text-gray-700' />
            <h4 className='text-lg font-semibold'>{blog.title}</h4>
            <p className='text-sm text-gray-600 mt-2'>{blog.desc}</p>
        </div>
    )
}

export default BlogCards