import React, { useState } from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import logo from "/assets/logo.png";
import axios from "axios";
import { useUser } from '@clerk/clerk-react'
import { GoArrowUpRight } from "react-icons/go";


export default function Footer() {
  const [feedback, setFeedback] = useState("");
  const { user } = useUser();

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

                <a href="https://www.linkedin.com/company/adamitras/" target="_blank" className="text-gray-800">
                  <FaLinkedin size={25} />
                </a>
                <a href="mailto:adamitrasweb@gmail.com" target="_blank" className="text-gray-800">
                  <HiOutlineMail size={25} />
                </a>
                <a href="https://youtube.com/@adamitras" target="_blank" className="text-gray-800">
                  <FaYoutube size={25} />
                </a>
                <a href="https://whatsapp.com/channel/0029VanA8tTFcow3FXisrx1I" target="_blank" className="text-gray-800">
                  <FaWhatsapp size={25} />
                </a>

              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-800 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/blogs" className="text-gray-800 hover:text-white transition-colors">
                  Blogs
                </a>
              </li>
              <li>
                <a href="/pyqs" className="text-gray-800 hover:text-white transition-colors">
                  PYQs
                </a>
              </li>
              <li>
                <a href="/career" className="text-gray-800 hover:text-white transition-colors">
                  Career
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-800 hover:text-white transition-colors">
                  Past members
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="text-gray-800 hover:text-white transition-colors">

                Adamas Knowledge City, <br /> Barasat, West Bengal - 700126

              </li>
              <li className="text-gray-800 hover:text-white transition-colors">
                adamitras@gmail.com
              </li>
              {/* <li>
                <a className="text-gray-800 hover:text-white transition-colors">
                  5858585800
                </a>
              </li>
              <li>
                <a className="text-gray-800 hover:text-white transition-colors">
                  
                </a>
              </li> */}

            </ul>
            <a style={{
              marginTop : "25px"
            }}
              href="https://whatsapp.com/channel/0029VanA8tTFcow3FXisrx1I"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md px-6 py-2 transition-colors inline-flex items-center gap-1"
            >
              Join <span className="text-sm relative -top-1">↗</span>
            </a>


          </div>

          {/* Feedback Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Feedback</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault(); // Prevent default form submission
                if (!user) {
                  alert("Please log in to submit feedback.");
                  return;
                }

                try {
                  const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/feedback`, {
                    username: user.fullName,
                    email: user.primaryEmailAddress.emailAddress,
                    message: feedback,
                  });

                  alert(res.data.message);
                  setFeedback(""); // Clear input field after submission
                } catch (error) {
                  alert("Something went wrong. Please try again.");
                  console.error(error);
                }
              }}
              className="flex flex-col sm:flex-row gap-2"
            >
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

            <div style={{
              marginTop: "15px"
            }}>
              © 2025 Adamitras. All Rights Reserved.
            </div>
          </div>


        </div>
      </div>
    </footer>
  );
}
