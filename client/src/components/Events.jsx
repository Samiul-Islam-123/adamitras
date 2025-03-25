import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaMapSigns, FaClock } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import axios from "axios";
import { IoIosCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.timeline()
      .to(".elem", { height: "100%", duration: 1.5, ease: "expo.inOut" })
      .to(".elem", { height: "0%", duration: 1, ease: "expo.inOut" })
      .to(".show", { opacity: 1 });

    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/event/all`);
      const eventsData = Array.isArray(response.data.data) ? response.data.data : [];
      setEvents(eventsData);
    } catch (error) {
      setError("Failed to fetch events.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Comprehensive date formatting function
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

  // Format time with AM/PM
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

  // Determine event status
  const getEventStatus = (event) => {
    const now = new Date();
    const registrationStartDate = event.registrationStartDate ? new Date(event.registrationStartDate) : null;
    const registrationEndDate = event.registrationEndDate ? new Date(event.registrationEndDate) : null;
    const eventStartDate = new Date(event.eventStartDate);
    const eventEndDate = event.eventEndDate ? new Date(event.eventEndDate) : null;

    console.log(`now : ${now}`);
    console.log(`registrationStartDate : ${registrationStartDate}`);
    console.log(`registrationEndDate : ${registrationEndDate}`);
    console.log(`eventStartDate : ${eventStartDate}`);
    console.log(`eventEndDate : ${eventEndDate}`);
    

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

  return (
    <div className="z-30 overflow-x-clip relative w-screen min-h-screen bg-white flex flex-col px-4 md:px-5 py-16">
      <div className="elem absolute w-screen h-0 text-white top-0 left-0 z-30 bg-purple-500 flex flex-col items-center justify-center">
        <FaCalendarAlt size={40} />
        <h1 className="text-center mt-2 text-4xl">Events</h1>
      </div>

      <div className="show opacity-0 w-full h-full">
        <button
          className="mb-5 p-2 rounded-full border border-black"
          onClick={() => navigate("/career")}
        >
          <MdOutlineArrowBack size={25} />
        </button>

        <h1 className="md:text-4xl font-medium text-3xl text-center mb-8">
          Upcoming Events
        </h1>

        {/* Loading and Error Handling */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : error ? (
          <p className="text-3xl mt-10 text-black/40 text-center">No Events Yet.</p>
        ) : events.length === 0 ? (
          <p className="text-3xl mt-10 text-black/40 text-center">No Events Scheduled.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {events.map((event) => {
              const status = getEventStatus(event);
              return (
                <div
                  key={event._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 relative"
                  onClick={() => setSelectedEvent(event)}
                >
                  {/* Status Tag */}
                  <div className={`absolute top-4 right-4 z-10 ${status.color} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                    {status.text}
                  </div>

                  {event.imageURL ? (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={event.imageURL}
                        alt={event.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-purple-100 flex items-center justify-center">
                      <FaCalendarAlt size={40} className="text-purple-300" />
                    </div>
                  )}
                  
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-3 line-clamp-1">{event.title}</h3>
                    
                    <div className="flex items-center text-gray-600 mb-2">
                      <FaCalendarAlt className="mr-2" />
                      <span>{formatDate(event.eventStartDate)}</span>
                    </div>
                    
                    {event.eventStartTime && (
                      <div className="flex items-center text-gray-600 mb-2">
                        <FaClock className="mr-2" />
                        <span>
                          {formatTime(event.eventStartTime)}
                          {event.eventEndTime ? ` - ${formatTime(event.eventEndTime)}` : ''}
                        </span>
                      </div>
                    )}
                    
                    {event.location && (
                      <div className="flex items-center text-gray-600 mb-3">
                        <FaMapSigns className="mr-2" />
                        <span>{event.location}</span>
                      </div>
                    )}
                    
                    {event.description && (
                      <p className="text-gray-600 line-clamp-2 text-sm">{event.description}</p>
                    )}
                    
                    <button 
                      className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors w-full"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50 px-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 bg-white text-red-500 p-1 rounded-full shadow-md hover:bg-red-500 hover:text-white transition-colors z-10"
            >
              <IoIosCloseCircle size={30} />
            </button>

            {selectedEvent.imageURL ? (
              <div className="w-full h-64 md:h-80">
                <img
                  src={selectedEvent.imageURL}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover rounded-t-xl"
                />
              </div>
            ) : (
              <div className="w-full h-64 bg-purple-100 flex items-center justify-center rounded-t-xl">
                <FaCalendarAlt size={64} className="text-purple-300" />
              </div>
            )}

            <div className="p-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{selectedEvent.title}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center bg-purple-50 p-3 rounded-lg">
                  <FaCalendarAlt className="text-purple-500 mr-3" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Event Start Date</p>
                    <p className="font-medium">{formatDate(selectedEvent.eventStartDate)}</p>
                  </div>
                </div>
                
                {selectedEvent.eventEndDate && (
                  <div className="flex items-center bg-purple-50 p-3 rounded-lg">
                    <FaCalendarAlt className="text-purple-500 mr-3" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Event End Date</p>
                      <p className="font-medium">{formatDate(selectedEvent.eventEndDate)}</p>
                    </div>
                  </div>
                )}
                
                {selectedEvent.eventStartTime && (
                  <div className="flex items-center bg-purple-50 p-3 rounded-lg">
                    <FaClock className="text-purple-500 mr-3" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Event Time</p>
                      <p className="font-medium">
                        {formatTime(selectedEvent.eventStartTime)}
                        {selectedEvent.eventEndTime ? ` - ${formatTime(selectedEvent.eventEndTime)}` : ''}
                      </p>
                    </div>
                  </div>
                )}
                
                {selectedEvent.registrationStartDate && (
                  <div className="flex items-center bg-purple-50 p-3 rounded-lg">
                    <FaCalendarAlt className="text-purple-500 mr-3" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Registration Start Date</p>
                      <p className="font-medium">{formatDate(selectedEvent.registrationStartDate)}</p>
                    </div>
                  </div>
                )}
                
                {selectedEvent.registrationEndDate && (
                  <div className="flex items-center bg-purple-50 p-3 rounded-lg">
                    <FaCalendarAlt className="text-purple-500 mr-3" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Registration End Date</p>
                      <p className="font-medium">{formatDate(selectedEvent.registrationEndDate)}</p>
                    </div>
                  </div>
                )}
                
                {selectedEvent.registrationStartTime && (
                  <div className="flex items-center bg-purple-50 p-3 rounded-lg">
                    <FaClock className="text-purple-500 mr-3" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Registration Time</p>
                      <p className="font-medium">
                        {formatTime(selectedEvent.registrationStartTime)}
                        {selectedEvent.registrationStartTime ? ` - ${formatTime(selectedEvent.registrationEndTime)}` : ''}
                      </p>
                    </div>
                  </div>
                )}
                
                {selectedEvent.location && (
                  <div className="flex items-center bg-purple-50 p-3 rounded-lg md:col-span-2">
                    <FaMapSigns className="text-purple-500 mr-3" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{selectedEvent.location}</p>
                    </div>
                  </div>
                )}
              </div>
              
              {selectedEvent.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-700 whitespace-pre-line">{selectedEvent.description}</p>
                </div>
              )}
              
              <button 
                onClick={() => setSelectedEvent(null)}
                className="w-full py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium"
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

export default Event;