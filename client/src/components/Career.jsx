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

    // Fixed: Proper Google Drive PDF handling
    const handleSeeClick = (pdfUrl) => {
        // Extract file ID from Google Drive URL
        const getFileIdFromUrl = (url) => {
            const match = url.match(/\/d\/([^\/]+)/);
            return match ? match[1] : null;
        };

        const fileId = getFileIdFromUrl(pdfUrl);
        
        if (fileId) {
            // Use Google Drive's preview URL (same as in your Pyq component)
            const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;
            setSelectedPdf(previewUrl);
        } else {
            // If it's not a Google Drive URL, use the original URL
            setSelectedPdf(pdfUrl);
        }
    };

    // Alternative: Open in new tab (similar to what might be working in Pyq)
    const handleOpenInNewTab = () => {
        if (selectedPdf) {
            window.open(selectedPdf, '_blank', 'noopener,noreferrer');
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
        <section className="w-screen min-h-screen flex items-center justify-start flex-col">
            <div className="w-full h-[90vh] overflow-y-auto py-20 px-10">
                <div className="w-full">
                    <h1 className="md:text-4xl font-medium text-3xl text-center">
                        Roadmaps
                    </h1>
                </div>
                
                {/* Loading and Error Handling */}
                {loading ? (
                    <p className="text-center mt-5">Loading roadmaps...</p>
                ) : error ? (
                    <p className="text-3xl mt-10 text-black/40">
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
                                <p className="text-sm text-gray-600 mt-2">
                                    Click to view PDF
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* PDF Viewer Modal - Similar to Pyq component approach */}
            {selectedPdf && (
                <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50">
                    <div className="bg-white rounded-lg w-[95%] h-[95%] relative flex flex-col">
                        {/* Header with buttons */}
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-lg font-semibold">PDF Viewer</h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleOpenInNewTab}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                                >
                                    Open in New Tab
                                </button>
                                <button
                                    onClick={() => setSelectedPdf(null)}
                                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                                >
                                    <IoIosCloseCircle size={24} />
                                </button>
                            </div>
                        </div>

                        {/* PDF Iframe - Simple like in Pyq component */}
                        <div className="flex-1">
                            <iframe
                                src={selectedPdf}
                                className="w-full h-full border-0"
                                title="PDF Viewer"
                                allow="autoplay"
                            >
                                <p className="p-4 text-center">
                                    Your browser does not support iframes. 
                                    <button 
                                        onClick={handleOpenInNewTab}
                                        className="text-blue-500 underline ml-2"
                                    >
                                        Open PDF in new tab
                                    </button>
                                </p>
                            </iframe>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Career;