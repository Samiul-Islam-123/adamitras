import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaMapSigns, FaClock } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


const EventDetails = () => {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const renderMarkdownDescription = (description) => {
        if (!description) return null;

        return (
            <div className="mt-6 md:mt-0">
                <h3 className="text-2xl font-semibold mb-4">Event Description</h3>
                <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    className="prose prose-sm dark:prose-invert max-w-none"
                    components={{
                        h1: ({node, ...props}) => <h2 className="text-xl font-bold mb-2" {...props} />,
                        h2: ({node, ...props}) => <h3 className="text-lg font-semibold mb-2" {...props} />,
                        a: ({node, ...props}) => (
                            <a 
                                className="text-purple-600 hover:underline" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                {...props} 
                            />
                        ),
                        code: ({node, inline, className, children, ...props}) => {
                            return !inline ? (
                                <code 
                                    className={`${className} bg-gray-100 p-2 rounded-md text-sm block overflow-x-auto`} 
                                    {...props}
                                >
                                    {children}
                                </code>
                            ) : (
                                <code 
                                    className="bg-gray-100 px-1 rounded text-sm" 
                                    {...props}
                                >
                                    {children}
                                </code>
                            );
                        }
                    }}
                >
                    {event.description}
                </ReactMarkdown>
            </div>
        );
    };

    // Date formatting function
    const formatDate = (dateString, options = {}) => {
        if (!dateString) return '';

        const defaultOptions = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        };

        try {
            const date = new Date(dateString);

            // Check if date is valid
            if (isNaN(date.getTime())) {
                console.warn(`Invalid date: ${dateString}`);
                return '';
            }

            return date.toLocaleDateString('en-US', { ...defaultOptions, ...options });
        } catch (error) {
            console.error('Error formatting date:', error);
            return '';
        }
    };

    // Time formatting function
    const formatTime = (timeString) => {
        if (!timeString) return '';

        try {
            const [hours, minutes] = timeString.split(':');
            const date = new Date();
            date.setHours(parseInt(hours), parseInt(minutes));

            return date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
        } catch (error) {
            console.error('Error formatting time:', error);
            return timeString;
        }
    };

    // Fetch event details
    useEffect(() => {
        const fetchEventDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/event/${id}`);
                setEvent(response.data.data);
            } catch (error) {
                setError("Failed to fetch event details.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [id]);

    // Determine event status
    const getEventStatus = (event) => {
        const now = new Date();
        const registrationStartDate = event.registrationStartDate ? new Date(event.registrationStartDate) : null;
        const registrationEndDate = event.registrationEndDate ? new Date(event.registrationEndDate) : null;
        const eventStartDate = new Date(event.eventStartDate);
        const eventEndDate = event.eventEndDate ? new Date(event.eventEndDate) : null;

        if (eventEndDate && now > eventEndDate) {
            return { text: "Ended", color: "bg-red-500" };
        }

        if (now >= eventStartDate && (!eventEndDate || now <= eventEndDate)) {
            return { text: "Live", color: "bg-green-500" };
        }

        if (registrationStartDate && registrationEndDate) {
            if (now >= registrationStartDate && now <= registrationEndDate) {
                return { text: "Registration Open", color: "bg-blue-500" };
            }

            if (now < registrationStartDate) {
                return { text: "Coming Soon", color: "bg-yellow-500" };
            }

            if (now > registrationEndDate) {
                return { text: "Registration Closed", color: "bg-red-500" };
            }
        }

        return { text: "Upcoming", color: "bg-purple-500" };
    };

    // Loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    // Error state
    if (error || !event) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen px-4">
                <p className="text-3xl text-black/40 text-center">Event Not Found</p>
                <button
                    onClick={() => navigate('/event')}
                    className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600"
                >
                    Back to Events
                </button>
            </div>
        );
    }

    // Event status
    const status = getEventStatus(event);

    return (
        <div className="min-h-screen bg-white flex flex-col px-4 md:px-5 py-16">
            <button
                className="mb-5 p-2 rounded-full border border-black self-start"
                onClick={() => navigate("/event")}
            >
                <MdOutlineArrowBack size={25} />
            </button>

            <div className="w-full max-w-6xl mx-auto">


                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column - Image and Details */}
                    <div className="space-y-6">
                        {event.imageURL ? (
                            <div className="w-full">
                                <img
                                    src={event.imageURL}
                                    alt={event.title}
                                    className="w-full object-contain rounded-xl"
                                />
                            </div>
                        ) : (
                            <div className="w-full h-64 bg-purple-100 flex items-center justify-center rounded-xl">
                                <FaCalendarAlt size={64} className="text-purple-300" />
                            </div>
                        )}

                        <div className=" flex flex-col gap-3">
                            <h2 className="text-3xl md:text-4xl font-bold">{event.title}</h2>
                            {/* Status Tag */}
                            <div className={` w-fit z-10 ${status.color} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                                {status.text}
                            </div>
                        </div>


                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center bg-purple-50 p-3 rounded-lg">
                                <FaCalendarAlt className="text-purple-500 mr-3" size={20} />
                                <div>
                                    <p className="text-sm text-gray-500">Event Start Date</p>
                                    <p className="font-medium">{formatDate(event.eventStartDate)}</p>
                                </div>
                            </div>

                            {event.eventEndDate && (
                                <div className="flex items-center bg-purple-50 p-3 rounded-lg">
                                    <FaCalendarAlt className="text-purple-500 mr-3" size={20} />
                                    <div>
                                        <p className="text-sm text-gray-500">Event End Date</p>
                                        <p className="font-medium">{formatDate(event.eventEndDate)}</p>
                                    </div>
                                </div>
                            )}

                            {event.eventStartTime && (
                                <div className="flex items-center bg-purple-50 p-3 rounded-lg">
                                    <FaClock className="text-purple-500 mr-3" size={20} />
                                    <div>
                                        <p className="text-sm text-gray-500">Event Time</p>
                                        <p className="font-medium">
                                            {formatTime(event.eventStartTime)}
                                            {event.eventEndTime ? ` - ${formatTime(event.eventEndTime)}` : ''}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {event.registrationStartDate && (
                                <div className="flex items-center bg-purple-50 p-3 rounded-lg">
                                    <FaCalendarAlt className="text-purple-500 mr-3" size={20} />
                                    <div>
                                        <p className="text-sm text-gray-500">Registration Start Date</p>
                                        <p className="font-medium">{formatDate(event.registrationStartDate)}</p>
                                    </div>
                                </div>
                            )}

                            {event.registrationEndDate && (
                                <div className="flex items-center bg-purple-50 p-3 rounded-lg">
                                    <FaCalendarAlt className="text-purple-500 mr-3" size={20} />
                                    <div>
                                        <p className="text-sm text-gray-500">Registration End Date</p>
                                        <p className="font-medium">{formatDate(event.registrationEndDate)}</p>
                                    </div>
                                </div>
                            )}

                            {event.registrationStartTime && (
                                <div className="flex items-center bg-purple-50 p-3 rounded-lg">
                                    <FaClock className="text-purple-500 mr-3" size={20} />
                                    <div>
                                        <p className="text-sm text-gray-500">Registration Time</p>
                                        <p className="font-medium">
                                            {formatTime(event.registrationStartTime)}
                                            {event.registrationEndTime ? ` - ${formatTime(event.registrationEndTime)}` : ''}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {event.location && (
                                <div className="flex items-center bg-purple-50 p-3 rounded-lg">
                                    <FaMapSigns className="text-purple-500 mr-3" size={20} />
                                    <div>
                                        <p className="text-sm text-gray-500">Location</p>
                                        <p className="font-medium">{event.location}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Description */}
                    {event.description && (
                        <div className="mt-6 md:mt-0">
                            <h3 className="text-2xl font-semibold mb-4">Event Description</h3>
                            <p className="text-gray-700 whitespace-pre-line leading-relaxed text-base">
                                {event.description}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventDetails;