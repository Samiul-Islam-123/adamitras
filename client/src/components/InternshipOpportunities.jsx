import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdOutlineArrowBack } from "react-icons/md";

import { Eye, Loader2 } from 'lucide-react';
import { FaBriefcase } from 'react-icons/fa';
import gsap from "gsap";
import { useNavigate } from 'react-router-dom';


const API_URL = `${import.meta.env.VITE_API_URL}/internship`; // Adjust to your backend URL

const InternshipOpportunities = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate();

  // Fetch posts on component mount
  useEffect(() => {
    gsap.timeline()
      .to(".elem", { height: "100%", duration: 1.5, ease: "expo.inOut" })
      .to(".elem", { height: "0%", duration: 1, ease: "expo.inOut" })
      .to(".show", { opacity: 1 });
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
    <div className="z-30 relative w-screen h-screen bg-white flex flex-col px-8 py-16">
      
      <div className="elem absolute w-screen h-[0%] text-white top-0 left-0 z-30 bg-green-500 flex flex-col items-center justify-center">
              <FaBriefcase size={40} />
              <h1 className="text-center mt-2 text-4xl ">Internships Opportunities</h1>
            </div>

      <div className=" show opacity-0 w-full h-full ">
         <button
                  className=" mb-5 p-2 rounded-full border border-black"
                  onClick={() => navigate("/career")}
                >
                  <MdOutlineArrowBack size={25} />
                </button>
        
                {/* <h2 className="text-3xl md:text-6xl hurricane">Internships Opportunities</h2> */}
          <h1 className=" md:text-4xl font-medium text-3xl text-center ">Internships Opportunities</h1>


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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10
           gap-6">
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