import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextEditor from './TextEditor';
import { ArrowLeft, Clock, Heart, MessageSquare, Tag, Loader2 } from 'lucide-react';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/blog/blogs/${id}`);
        setBlog(response.data.data);
      } catch (err) {
        console.error('Error fetching blog details:', err);
        setError('Failed to load blog details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchBlogDetails();
    }
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleBackClick = () => {
    navigate('/blogs');
  };

  // Parse JSON string for tags if needed
  const parseTags = (tagString) => {
    if (!tagString) return [];
    try {
      // Handle the case where tags might be a string representation of a JSON array
      if (typeof tagString === 'string' && tagString.startsWith('[')) {
        return JSON.parse(tagString);
      }
      return tagString;
    } catch (e) {
      console.error('Error parsing tags:', e);
      return [];
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <span>{error}</span>
        </div>
        <button 
          onClick={handleBackClick}
          className="flex items-center text-blue-500 hover:underline"
        >
          <ArrowLeft size={20} className="mr-2" /> Back to Blogs
        </button>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <p className="text-xl text-gray-600 mb-4">Blog not found</p>
        <button 
          onClick={handleBackClick}
          className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <ArrowLeft size={20} className="mr-2" /> Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button 
        onClick={handleBackClick}
        className="flex items-center text-blue-500 hover:underline mb-6"
      >
        <ArrowLeft size={20} className="mr-2" /> Back to Blogs
      </button>
      
      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        {blog.imageURL && (
          <div className="w-full h-80">
            <img 
              src={blog.imageURL} 
              alt={blog.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
          
          <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 pb-4 border-b">
            {blog.author && (
              <div className="flex items-center mr-6 mb-2">
                {blog.author.avatarURL && (
                  <img 
                    src={blog.author.avatarURL} 
                    alt={blog.author.username} 
                    className="w-8 h-8 rounded-full mr-2"
                  />
                )}
                <span>{blog.author.username}</span>
              </div>
            )}
            
            <div className="flex items-center mr-6 mb-2">
              <Clock size={18} className="mr-1" />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
            
            {blog.likes && (
              <div className="flex items-center mr-6 mb-2">
                <Heart size={18} className="mr-1" />
                <span>{blog.likes.length} likes</span>
              </div>
            )}
            
            {blog.comments && (
              <div className="flex items-center mb-2">
                <MessageSquare size={18} className="mr-1" />
                <span>{blog.comments.length} comments</span>
              </div>
            )}
          </div>
          
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags.map((tagItem, index) => {
                // Handle the complex tag structure
                const tags = parseTags(tagItem);
                return Array.isArray(tags) ? (
                  tags.map((tag, idx) => (
                    <span 
                      key={`${index}-${idx}`} 
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      <Tag size={14} className="mr-1" /> {tag}
                    </span>
                  ))
                ) : (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    <Tag size={14} className="mr-1" /> {tagItem}
                  </span>
                );
              })}
            </div>
          )}
          
          <div 
            className="prose max-w-none" 
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </article>
    </div>
  );
};

export default BlogDetails;