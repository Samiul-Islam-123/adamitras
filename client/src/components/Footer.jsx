import React, { useState } from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "/assets/logo.png";

export default function Footer() {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Feedback submitted: ${feedback}`);
    setFeedback("");
  };

  return (
    <footer className="bg-yellow-400 text-gray-900 py-16 px-6 md:px-12">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex gap-3">
              <img src={logo} className="h-8" alt="Adamitras Logo" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Adamitras</h2>
            </div>
            <p className="text-gray-800">Your Dearest Digital Senior.</p>

            {/* Connect With Us */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className=" text-gray-800">
                  <FaGithub size={25} />
                </a>
                <a href="#" className=" text-gray-800">
                  <FaInstagram size={25} />
                </a>
                <a href="#" className=" text-gray-800">
                  <FaLinkedin size={25} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/home" className="text-gray-800 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/blogs" className="text-gray-800 hover:text-white transition-colors">
                  Blogs
                </a>
              </li>
              <li>
                <a href="pyqs" className="text-gray-800 hover:text-white transition-colors">
                  Pyqs
                </a>
              </li>
              <li>
                <a href="/career" className="text-gray-800 hover:text-white transition-colors">
                  Career
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li>
                <a  className="text-gray-800 hover:text-white transition-colors">
                  www.adamitras.in
                </a>
              </li>
              <li>
                <a className="text-gray-800 hover:text-white transition-colors">
                  5858585800
                </a>
              </li>
              <li>
                <a className="text-gray-800 hover:text-white transition-colors">
                  Adamas University <br /> Barasat, West Bengal
                </a>
              </li>
              
            </ul>
          </div>

          {/* Feedback Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Feedback</h3>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Your thoughts..."
                className="bg-white text-gray-900 rounded-md px-4 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-gray-800"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              <button
                type="submit"
                className="bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md px-6 py-2 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
