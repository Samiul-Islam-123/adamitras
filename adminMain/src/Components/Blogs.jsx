import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Clock, Loader2 } from 'lucide-react';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchBlogs = async() => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/blog/blogs`);
      console.log(response);
      setBlogs(response.data.data || []);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('Failed to load blogs. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  // Function to strip HTML tags for excerpt
  const stripHtml = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Our Blogs</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert">
          <span>{error}</span>
        </div>
      )}
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-blue-500" size={48} />
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-xl">No blogs found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div 
              key={blog._id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
              onClick={() => handleBlogClick(blog._id)}
            >
              {blog.imageURL && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={blog.imageURL} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}
              
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 line-clamp-2">{blog.title}</h2>
                
                <p className="text-gray-600 mb-3 line-clamp-3">
                  {stripHtml(blog.content).substring(0, 150)}
                  {stripHtml(blog.content).length > 150 ? '...' : ''}
                </p>
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center">
                    {blog.author?.avatarURL && (
                      <img 
                        src={blog.author.avatarURL} 
                        alt={blog.author.username} 
                        className="w-6 h-6 rounded-full mr-2"
                      />
                    )}
                    <span>{blog.author?.username || 'Anonymous'}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span>{formatDate(blog.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;