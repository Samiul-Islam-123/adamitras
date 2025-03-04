import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Eye, Loader2 } from 'lucide-react';

const API_URL = `${import.meta.env.VITE_API_URL}/internship`; // Adjust to your backend URL

const InternshipOpportunities = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Fetch all posts
  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/all`);
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

  const openPostModal = (post) => {
    setSelectedPost(post);
  };

  const closePostModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Internship Opportunities</h1>
      
      {/* Error Handling */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-blue-500" size={48} />
        </div>
      ) : (posts || []).length === 0 ? (
        <p className="text-center text-gray-500 text-xl">No internship posts available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(posts || []).map(post => (
            <div 
              key={post._id} 
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105"
            >
              {post.imageURL && (
                <img 
                  src={post.imageURL} 
                  alt="Internship Post" 
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                {post.caption && (
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {post.caption}
                  </p>
                )}
                <button 
                  onClick={() => openPostModal(post)}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition flex items-center justify-center"
                >
                  <Eye className="mr-2" size={20} />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

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
                <p className="mb-4 text-gray-800 whitespace-pre-wrap">
                  {selectedPost.caption}
                </p>
              )}
              <button 
                onClick={closePostModal}
                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipOpportunities;