import React, { useEffect } from 'react'
import TextEditor from './TextEditor'
import axios from 'axios'

const Blogs = () => {

  const fetchBlogs = async() => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/blog/blogs`);
    console.log(response);
  };

  useEffect(() => {
    fetchBlogs();
  },[])

  return (
    <div>
        
    </div>
  )
}

export default Blogs