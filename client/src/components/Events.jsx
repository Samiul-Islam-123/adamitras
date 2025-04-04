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

  // Function to determine the current status of an event dynamically
  const getEventStatus = (event) => {
    const now = new Date();
    console.log(`--- DEBUG EVENT: ${event.title} ---`);
    console.log(`Current time: ${now.toLocaleString()}`);
    
    // Parse event dates and times
    const regStartDate = new Date(event.registrationStartDate);
    const regEndDate = new Date(event.registrationEndDate);
    const eventStartDate = new Date(event.eventStartDate);
    const eventEndDate = new Date(event.eventEndDate);
    
    console.log(`Initial parsed dates:`);
    console.log(`- Registration start: ${regStartDate.toLocaleString()}`);
    console.log(`- Registration end: ${regEndDate.toLocaleString()}`);
    console.log(`- Event start: ${eventStartDate.toLocaleString()}`);
    console.log(`- Event end: ${eventEndDate.toLocaleString()}`);
    console.log(`- Registration start time: ${event.registrationStartTime}`);
    console.log(`- Registration end time: ${event.registrationEndTime}`);
    console.log(`- Event start time: ${event.eventStartTime}`);
    console.log(`- Event end time: ${event.eventEndTime}`);
    
    // Set time components for more accurate comparison
    if (event.registrationStartTime) {
      const [startHours, startMinutes] = event.registrationStartTime.split(':').map(Number);
      regStartDate.setHours(startHours, startMinutes, 0);
      console.log(`Applied start time: ${startHours}:${startMinutes}, new regStartDate: ${regStartDate.toLocaleString()}`);
    }
    
    if (event.registrationEndTime) {
      const [endHours, endMinutes] = event.registrationEndTime.split(':').map(Number);
      regEndDate.setHours(endHours === 0 ? 23 : endHours, endMinutes === 0 ? 59 : endMinutes, 59);
      console.log(`Applied end time: ${endHours === 0 ? 23 : endHours}:${endMinutes === 0 ? 59 : endMinutes}, new regEndDate: ${regEndDate.toLocaleString()}`);
    } else {
      // Default to end of day if no specific time
      regEndDate.setHours(23, 59, 59);
      console.log(`No reg end time specified, defaulting to end of day: ${regEndDate.toLocaleString()}`);
    }
    
    if (event.eventStartTime) {
      const [startHours, startMinutes] = event.eventStartTime.split(':').map(Number);
      eventStartDate.setHours(startHours, startMinutes, 0);
      console.log(`Applied event start time: ${startHours}:${startMinutes}, new eventStartDate: ${eventStartDate.toLocaleString()}`);
    }
    
    if (event.eventEndTime) {
      const [endHours, endMinutes] = event.eventEndTime.split(':').map(Number);
      eventEndDate.setHours(endHours, endMinutes, 59);
      console.log(`Applied event end time: ${endHours}:${endMinutes}, new eventEndDate: ${eventEndDate.toLocaleString()}`);
    } else {
      // Default to end of day if no specific time
      eventEndDate.setHours(23, 59, 59);
      console.log(`No event end time specified, defaulting to end of day: ${eventEndDate.toLocaleString()}`);
    }
    
    console.log(`Final date comparison values:`);
    console.log(`- now < regStartDate: ${now < regStartDate} (${now.toLocaleString()} < ${regStartDate.toLocaleString()})`);
    console.log(`- now >= regStartDate && now <= regEndDate: ${now >= regStartDate && now <= regEndDate} (${regStartDate.toLocaleString()} <= ${now.toLocaleString()} <= ${regEndDate.toLocaleString()})`);
    console.log(`- now > regEndDate && now < eventStartDate: ${now > regEndDate && now < eventStartDate} (${now.toLocaleString()} > ${regEndDate.toLocaleString()} && ${now.toLocaleString()} < ${eventStartDate.toLocaleString()})`);
    console.log(`- now >= eventStartDate && now <= eventEndDate: ${now >= eventStartDate && now <= eventEndDate} (${now.toLocaleString()} >= ${eventStartDate.toLocaleString()} && ${now.toLocaleString()} <= ${eventEndDate.toLocaleString()})`);
    console.log(`- now > eventEndDate: ${now > eventEndDate} (${now.toLocaleString()} > ${eventEndDate.toLocaleString()})`);
    
    // Determine status based on current time
    let status;
    if (now < regStartDate) {
      status = "Coming Soon";
    } else if (now >= regStartDate && now <= regEndDate) {
      status = "Registration Open";
    } else if (now > regEndDate && now < eventStartDate) {
      status = "Registration Closed";
    } else if (now >= eventStartDate && now <= eventEndDate) {
      status = "Live";
    } else {
      status = "Ended";
    }
    
    console.log(`Final status determined: ${status}`);
    console.log(`--- END DEBUG EVENT: ${event.title} ---\n`);
    
    return status;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Registration Open":
        return "bg-blue-500";
      case "Registration Closed":
        return "bg-red-500";
      case "Live":
        return "bg-green-500";
      case "Ended":
        return "bg-gray-500";
      case "Coming Soon":
        return "bg-yellow-500";
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
            {events.map((event) => {
              // Calculate dynamic status
              const eventStatus = getEventStatus(event);
              
              return (
                <div
                  key={event._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 relative"
                  onClick={() => navigate(`/event/${event._id}`)}
                >
                  {/* Status Tag - using dynamically calculated status */}
                  <div className={`absolute top-4 right-4 z-10 ${getStatusColor(eventStatus)} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                    {eventStatus}
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
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;