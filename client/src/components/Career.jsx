import React, { useState, useEffect } from "react";
import {
    FaMapSigns,
    FaBriefcase,
    FaCalendarAlt,
    FaHourglassHalf,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowBack } from "react-icons/md";
import axios from "axios";
import { IoIosCloseCircle } from "react-icons/io";
import gsap from "gsap";

const Career = () => {
    const [roadmaps, setRoadmaps] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRoadmaps();
    }, []);

    const fetchRoadmaps = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/drive/roadmaps`
            );
            setRoadmaps(response.data.roadmaps);
        } catch (error) {
            setError("Failed to fetch roadmaps.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const options = [
        {
            name: "Roadmaps",
            color: "bg-blue-500",
            icon: <FaMapSigns size={40} />,
            path: "roadmaps",
        },
        {
            name: "Internship Opportunities",
            color: "bg-green-500",
            icon: <FaBriefcase size={40} />,
            path: "internship-opportunities",
        },
        {
            name: "Events",
            color: "bg-purple-500",
            icon: <FaCalendarAlt size={40} />,
            path: "event",
        },
        {
            name: "Coming Soon",
            color: "bg-gray-300",
            icon: <FaHourglassHalf size={40} />,
            path: "career",
        },
    ];

    return (
        <section className="w-screen h-screen flex items-center justify-center flex-col">
            {/* <div className='grid grid-cols-2 gap-6 -mt-20'>
        {options.map((option, index) => (
          <button
            key={index}
            onClick={()=>navigate(`/${option.path}`)}
            className={`md:w-[25vw] md:h-[25vh] w-[40vw] h-[30vh] flex flex-col items-center justify-center text-white text-xl font-semibold rounded-2xl shadow-lg transition-transform transform hover:scale-105 cursor-pointer ${option.color}`}
          >
            {option.icon}
            <h2 className='text-center mt-3'>{option.name}</h2>
          </button>
        ))}
      </div> */}

            <div className=" w-full h-full py-20 px-10">
                <div className="  w-full">
                    {/* <h2 className="text-5xl md:text-8xl hurricane">Roadmaps</h2> */}
                    <h1 className=" md:text-4xl font-medium text-3xl text-center ">
                        Roadmaps
                    </h1>
                </div>

                {/* Loading and Error Handling */}
                {loading ? (
                    <p className="text-center mt-5">Loading roadmaps...</p>
                ) : error ? (
                    <p className=" text-3xl mt-10 text-black/40">
                        No Roadmaps Yet.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        {roadmaps.map((roadmap) => (
                            <div
                                key={roadmap.id}
                                className="p-5 bg-gray-100 shadow-lg rounded-lg cursor-pointer hover:bg-gray-200 transition"
                                onClick={() => handleSeeClick(roadmap.viewLink)}
                            >
                                <h3 className="text-xl font-semibold">
                                    {roadmap.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* PDF Viewer */}
            {selectedPdf && (
                <div className="absolute inset-0 flex justify-center items-center z-50 bg-black/50">
                    <div className="bg-white p-4 rounded-lg w-[90%] h-[90%] relative">
                        <button
                            onClick={() => setSelectedPdf(null)}
                            className="absolute -top-3 -right-3 bg-red-500 text-white p-1 rounded-full"
                        >
                            <IoIosCloseCircle size={30} />
                        </button>

                        <iframe
                            allowFullScreen={false}
                            sandbox="allow-scripts allow-same-origin allow-forms"
                            src={selectedPdf}
                            className="w-full h-full"
                            title="PDF Viewer"
                        ></iframe>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Career;
