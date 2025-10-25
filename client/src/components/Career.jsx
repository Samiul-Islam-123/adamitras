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

    // Enhanced: Use more restrictive Google Drive URL parameters
    const handleSeeClick = (pdfUrl) => {
        const getFileIdFromUrl = (url) => {
            const match = url.match(/\/d\/([^\/]+)/);
            return match ? match[1] : null;
        };

        const fileId = getFileIdFromUrl(pdfUrl);
        
        if (fileId) {
            // Use more restrictive parameters to disable all toolbar actions
            // These parameters mimic what's likely used in ShowPyqs
            const previewUrl = `https://drive.google.com/file/d/${fileId}/preview?rm=minimal&toolbar=0&navpanes=0&viewer=0`;
            setSelectedPdf(previewUrl);
        } else {
            // For non-Google Drive URLs, use blob approach as fallback
            setSelectedPdf(pdfUrl);
        }
    };

    // Alternative: Use the blob approach if the above doesn't work
    const handleSeeClickAlternative = async (pdfUrl) => {
        const getFileIdFromUrl = (url) => {
            const match = url.match(/\/d\/([^\/]+)/);
            return match ? match[1] : null;
        };

        const fileId = getFileIdFromUrl(pdfUrl);
        
        if (fileId) {
            try {
                // Get the direct download URL and convert to blob
                const directDownloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
                
                const response = await fetch(directDownloadUrl);
                const blob = await response.blob();
                const blobUrl = URL.createObjectURL(blob);
                
                setSelectedPdf(blobUrl);
            } catch (error) {
                console.error("Error loading PDF:", error);
                // Fallback to preview mode
                const previewUrl = `https://drive.google.com/file/d/${fileId}/preview?rm=minimal`;
                setSelectedPdf(previewUrl);
            }
        } else {
            setSelectedPdf(pdfUrl);
        }
    };

    // Clean up blob URLs
    useEffect(() => {
        return () => {
            if (selectedPdf && selectedPdf.startsWith('blob:')) {
                URL.revokeObjectURL(selectedPdf);
            }
        };
    }, [selectedPdf]);

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
                                // Uncomment the line below if the first approach doesn't work
                                // onClick={() => handleSeeClickAlternative(roadmap.viewLink)}
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

            {/* PDF Viewer Modal */}
            {selectedPdf && (
                <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50">
                    <div className="bg-white rounded-lg w-[95%] h-[95%] relative flex flex-col">
                        {/* Header */}
                        <div className="flex justify-end items-center p-4 border-b">
                            <button
                                onClick={() => {
                                    if (selectedPdf.startsWith('blob:')) {
                                        URL.revokeObjectURL(selectedPdf);
                                    }
                                    setSelectedPdf(null);
                                }}
                                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                            >
                                <IoIosCloseCircle size={24} />
                            </button>
                        </div>

                        {/* PDF Iframe with additional restrictions */}
                        <div className="flex-1 w-full h-full">
                            <iframe
                                src={selectedPdf}
                                className="w-full h-full border-0"
                                title="PDF Viewer"
                                // Additional restrictions
                                sandbox="allow-scripts allow-same-origin"
                                allow="autoplay"
                                onContextMenu={(e) => e.preventDefault()}
                                style={{ 
                                    pointerEvents: 'auto'
                                }}
                            >
                                <p className="p-4 text-center">
                                    Your browser does not support iframes.
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