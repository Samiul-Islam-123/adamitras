import React, { useState, useEffect } from "react";
import {
    FaMapSigns,
    FaBriefcase,
    FaCalendarAlt,
    FaHourglassHalf,
    FaFilePdf,
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

    const handleSeeClick = (pdfUrl) => {
        const getFileIdFromUrl = (url) => {
            const match = url.match(/\/d\/([^\/]+)/);
            return match ? match[1] : null;
        };

        const fileId = getFileIdFromUrl(pdfUrl);
        
        if (fileId) {
            const previewUrl = `https://drive.google.com/file/d/${fileId}/preview?rm=minimal&toolbar=0&navpanes=0&viewer=0`;
            setSelectedPdf(previewUrl);
        } else {
            setSelectedPdf(pdfUrl);
        }
    };

    // Function to extract a clean filename without extension
    const getCleanFileName = (fileName) => {
        return fileName.replace('.pdf', '').replace(/_/g, ' ').replace(/-/g, ' ');
    };

    // Function to get a color based on filename for consistent styling
    const getCardColor = (fileName, index) => {
        const colors = [
            'bg-blue-100 border-blue-300',
            'bg-green-100 border-green-300', 
            'bg-purple-100 border-purple-300',
            'bg-orange-100 border-orange-300',
            'bg-red-100 border-red-300',
            'bg-indigo-100 border-indigo-300'
        ];
        return colors[index % colors.length];
    };

    return (
        <section className="w-screen min-h-screen flex items-center justify-start flex-col bg-gray-50">
            <div className="w-full h-[90vh] overflow-y-auto py-20 px-4 md:px-10">
                <div className="w-full mb-8">
                    <h1 className="md:text-4xl font-bold text-3xl text-center text-gray-800">
                        Roadmaps
                    </h1>
                    <p className="text-center text-gray-600 mt-2">
                        Comprehensive guides for your career path
                    </p>
                </div>
                
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <p className="text-center text-lg">Loading roadmaps...</p>
                    </div>
                ) : error ? (
                    <div className="flex justify-center items-center h-40">
                        <p className="text-2xl text-gray-400">
                            No Roadmaps Available
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {roadmaps.map((roadmap, index) => (
                            <div
                                key={roadmap.id}
                                className={`border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${getCardColor(roadmap.name, index)}`}
                                onClick={() => handleSeeClick(roadmap.viewLink)}
                            >
                                {/* PDF Card Header with Icon */}
                                <div className="p-6 text-center border-b">
                                    <div className="flex justify-center mb-4">
                                        <div className="p-4 rounded-full bg-white shadow-md">
                                            <FaFilePdf size={32} className="text-red-500" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">
                                        {getCleanFileName(roadmap.name)}
                                    </h3>
                                </div>
                                
                                {/* Card Footer */}
                                <div className="p-4 bg-white/50 rounded-b-xl">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600 flex items-center">
                                            <FaMapSigns className="mr-1" size={14} />
                                            Click to view
                                        </span>
                                        <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                                            PDF
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* PDF Viewer Modal */}
            {selectedPdf && (
                <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50">
                    <div className="bg-white rounded-lg w-[95%] h-[95%] relative flex flex-col">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-lg font-semibold">PDF Viewer</h3>
                            <button
                                onClick={() => setSelectedPdf(null)}
                                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                            >
                                <IoIosCloseCircle size={24} />
                            </button>
                        </div>

                        <div className="flex-1 w-full h-full">
                            <iframe
                                src={selectedPdf}
                                className="w-full h-full border-0"
                                title="PDF Viewer"
                                sandbox="allow-scripts allow-same-origin"
                            >
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-center text-gray-500">
                                        Your browser does not support PDF viewing. 
                                        <br />
                                        Please try with a different browser.
                                    </p>
                                </div>
                            </iframe>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Career;