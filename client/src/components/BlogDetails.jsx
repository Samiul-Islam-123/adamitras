import React from 'react'

const BlogDetails = (data) => {
  return (
    <div className='fixed top-0 left-0 w-screen h-screen '>
        <div className=' w-[90%] h-[95%] rounded-xl shadow-md flex'>
            
            <h2>{data.title}</h2>
            <div>
                {data.content}
            </div>
        </div>
    </div>
  )
}

export default BlogDetails