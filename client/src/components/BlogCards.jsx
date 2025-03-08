import React, { useState } from 'react';
import BlogDetails from './BlogDetails';
import {useNavigate} from "react-router-dom"

const BlogCards = ({ blog }) => {
    const [imageError, setImageError] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const navigate = useNavigate();
    const show = () => {
        console.log(blog)
        navigate(blog._id)
    }

    // Convert Google Drive URL to a direct image link
    const getDirectImageURL = (url) => {
        const match = url.match(/(?:file\/d\/|id=)([^\/?]+)/);
        return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : url;
    };

    const imageURL = getDirectImageURL(blog.imageURL);
    console.log("Image URL:", imageURL);

    return (
        <>
        {
            // showDetail === true && (<>
            //     <BlogDetails data={blog} />
            // </>)
        }
        <div onClick={()=>show()} className='flex flex-col md:w-[20vw] md:h-[25vw] w-[40vw] h-[55vw] p-1 bg-[#FFF4CE] border border-[#EFC740] rounded-lg shadow-md mx-2 my-3'>
            <div className='bg-white w-full h-1/2 rounded-md overflow-hidden'>
                <img 
                    src={blog.imageURL} 
                    alt={blog.title} 
                    className='w-full h-full object-cover object-center' 
                    onError={() => setImageError(true)} // Only sets error once
                />
            </div>
            <div className='lg:p-4 lg:pt-5 p-2'>
                <h4 className='lg:text-xl text-sm font-semibold'>{blog.title}</h4>
                <p className='text-xs text-gray-600 mt-2'>{blog.desc}</p>
            </div>
        </div>
        </>
    );
};

export default BlogCards;
