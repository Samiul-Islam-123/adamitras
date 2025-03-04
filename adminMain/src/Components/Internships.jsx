import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Upload, ImagePlus, Trash2, Eye, Loader2 } from 'lucide-react';

const API_URL = `${import.meta.env.VITE_API_URL}/internship`; // Adjust to your backend URL

const Internships = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Fetch all posts
  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log(API_URL)
      const response = await axios.get(`${API_URL}/all`);
      console.log(response)
      // Ensure data is an array, default to empty array if not
      setPosts(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (err) {
      setError('Failed to fetch internship posts');
      console.error('Fetch posts error:', err);
      setPosts([]); // Ensure posts is an empty array in case of error
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitPost = async () => {
    // Validate input
    if (!image && !caption.trim()) {
      setError('Please add an image or caption');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      
      // Convert base64 to file if image exists
      if (image) {
        const response = await fetch(image);
        const blob = await response.blob();
        formData.append('image', blob, 'uploaded-image.jpg');
      }
      
      // Append caption
      formData.append('caption', caption);

      // Send POST request
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Add new post to state (safely handle potential undefined)
      const newPost = response.data?.data;
      if (newPost) {
        setPosts(prevPosts => [newPost, ...prevPosts]);
      }

      // Reset form
      setImage(null);
      setCaption('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError('Failed to upload internship post');
      console.error('Upload error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeletePost = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_URL}/${id}`);
      
      // Remove post from state
      setPosts(prevPosts => prevPosts.filter(post => post._id !== id));
      
      // Close modal if the deleted post was selected
      if (selectedPost && selectedPost._id === id) {
        setSelectedPost(null);
      }
    } catch (err) {
      setError('Failed to delete internship post');
      console.error('Delete post error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const openPostModal = (post) => {
    setSelectedPost(post);
  };

  const closePostModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Share an Internship Post</h2>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Image Upload */}
        <div className="mb-4">
          <input 
            type="file" 
            ref={fileInputRef}
            accept="image/*" 
            onChange={handleImageUpload} 
            className="hidden"
            id="imageUpload"
            disabled={isLoading}
          />
          <label 
            htmlFor="imageUpload" 
            className="flex items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition"
          >
            {image ? (
              <div className="relative w-full h-full">
                <img 
                  src={image} 
                  alt="Uploaded" 
                  className="w-full h-full object-cover rounded-lg"
                />
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveImage();
                  }} 
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  disabled={isLoading}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center text-gray-500">
                <ImagePlus size={48} />
                <p className="mt-2">Upload Image</p>
              </div>
            )}
          </label>
        </div>

        {/* Caption Input */}
        <textarea 
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption about your internship experience..."
          className="w-full p-2 border rounded-lg mb-4 resize-none h-24"
          disabled={isLoading}
        />

        {/* Submit Button */}
        <button 
          onClick={handleSubmitPost}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 animate-spin" />
          ) : (
            <Upload className="mr-2" />
          )}
          Post
        </button>

        {/* Posts Grid */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Your Posts</h3>
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Loader2 className="animate-spin text-blue-500" size={48} />
            </div>
          ) : (posts || []).length === 0 ? (
            <p className="text-gray-500 text-center">No posts yet</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {(posts || []).map(post => (
                <div 
                  key={post._id} 
                  className="relative bg-gray-100 rounded-lg overflow-hidden group"
                >
                  {post.imageURL && (
                    <img 
                      src={post.imageURL} 
                      alt="Post" 
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <button 
                      onClick={() => openPostModal(post)}
                      className="bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Eye size={24} className="text-blue-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-auto">
            {selectedPost.imageURL && (
              <img 
                src={selectedPost.imageURL} 
                alt="Post" 
                className="w-full h-96 object-cover rounded-t-lg"
              />
            )}
            <div className="p-4">
              {selectedPost.caption && (
                <p className="mb-4 text-gray-800">{selectedPost.caption}</p>
              )}
              <div className="flex space-x-4">
                <button 
                  onClick={closePostModal}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Close
                </button>
                <button 
                  onClick={() => handleDeletePost(selectedPost._id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mx-auto animate-spin" />
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Internships;