import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaMapSigns, FaClock } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.timeline()
      .to(".elem", { height: "100vh", duration: 1.5, ease: "expo.inOut" })
      .to(".elem", { height: "0vh", duration: 1, ease: "expo.inOut" })
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

  const getStatusColor = (status) => {
    switch (status) {
      case "registration open":
        return "bg-blue-500";
      case "Registration Closed":
        return "bg-red-500";
      case "Live":
        return "bg-green-500";
      case "Ended":
        return "bg-gray-500";
      case "Coming Soon":
        return "bg-yellow-500";
      case "Upcoming":
      default:
        return "bg-purple-500";
    }
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

  return (
    <div className="z-30 overflow-x-clip relative w-screen min-h-screen bg-white flex flex-col px-4 md:px-5 py-16">
      <div className="elem absolute w-screen h-0 text-white top-0 left-0 z-30 bg-purple-500 flex flex-col items-center justify-center">
        <FaCalendarAlt size={40} />
        <h1 className="text-center mt-2 text-4xl">Events</h1>
      </div>

      <div className="show opacity-0 w-full h-full">
        <button className="mb-5 p-2 rounded-full border border-black" onClick={() => navigate("/career")}>
          <MdOutlineArrowBack size={25} />
        </button>

        <h1 className="md:text-4xl font-medium text-3xl text-center mb-8">Upcoming Events</h1>

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
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 relative"
                onClick={() => navigate(`/event/${event._id}`)}
              >
                {/* Status Tag */}
               {event.currentStatus && (<>
                <div className={`absolute top-4 right-4 z-10 ${getStatusColor(event.currentStatus)} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                  {event.currentStatus}
                </div>

               </>)}
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
                    {formatDate(event.eventStartDate)}
                  </div>

                  {event.eventStartTime && (
                    <div className="flex items-center text-gray-600 mb-2">
                      <FaClock className="mr-2" />
                      <span>{event.eventStartTime} {event.eventEndTime ? ` - ${event.eventEndTime}` : ''}</span>
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

                  <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors w-full">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;