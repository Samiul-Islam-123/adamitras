import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Upload, ImagePlus, Trash2, Eye, Loader2, Calendar, Clock } from 'lucide-react';

const API_URL = `${import.meta.env.VITE_API_URL}/event`; // Adjust to your backend URL

const Events = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [timestart, setTimeStart] = useState('');
  const [timeend, setTimeEnd] = useState('');
  
  const [location, setLocation] = useState('');
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch all events
  const fetchEvents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/all`);
      // Ensure data is an array, default to empty array if not
      setEvents(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (err) {
      setError('Failed to fetch events');
      console.error('Fetch events error:', err);
      setEvents([]); // Ensure events is an empty array in case of error
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitEvent = async () => {
    // Validate input
    if (!title.trim()) {
      setError('Event title is required');
      return;
    }

    if (!date.trim()) {
      setError('Event date is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      
      // Convert base64 to file if image exists
      if (image) {
        const response = await fetch(image);
        const blob = await response.blob();
        formData.append('image', blob, 'event-image.jpg');
      }
      
      // Append event details
      formData.append('title', title);
      formData.append('description', description);
      formData.append('date', date);
      formData.append('timestart', timestart);
      formData.append('timeend', timeend);
      
      formData.append('location', location);

      // Send POST request
      const response = await axios.post(`${API_URL}/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Add new event to state (safely handle potential undefined)
      const newEvent = response.data?.data;
      if (newEvent) {
        setEvents(prevEvents => [newEvent, ...prevEvents]);
      }

      // Reset form
      setImage(null);
      setTitle('');
      setDescription('');
      setDate('');
      setTimeStart('');
      setTimeEnd('');
      setLocation('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError('Failed to create event');
      console.error('Upload error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeleteEvent = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_URL}/${id}`);
      
      // Remove event from state
      setEvents(prevEvents => prevEvents.filter(event => event._id !== id));
      
      // Close modal if the deleted event was selected
      if (selectedEvent && selectedEvent._id === id) {
        setSelectedEvent(null);
      }
    } catch (err) {
      setError('Failed to delete event');
      console.error('Delete event error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const openEventModal = (event) => {
    setSelectedEvent(event);
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Create an Event</h2>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Image Upload */}
        <div className="mb-4">
          <input 
            type="file" 
            ref={fileInputRef}
            accept="image/*" 
            onChange={handleImageUpload} 
            className="hidden"
            id="imageUpload"
            disabled={isLoading}
          />
          <label 
            htmlFor="imageUpload" 
            className="flex items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition"
          >
            {image ? (
              <div className="relative w-full h-full">
                <img 
                  src={image} 
                  alt="Uploaded" 
                  className="w-full h-full object-cover rounded-lg"
                />
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveImage();
                  }} 
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  disabled={isLoading}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center text-gray-500">
                <ImagePlus size={48} />
                <p className="mt-2">Upload Event Image</p>
              </div>
            )}
          </label>
        </div>

        {/* Event Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Event Title*
          </label>
          <input 
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter event title"
            className="w-full p-2 border rounded-lg"
            disabled={isLoading}
            required
          />
        </div>

        {/* Event Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date*
            </label>
            <div className="relative">
              <input 
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border rounded-lg pl-10"
                disabled={isLoading}
                required
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
              start time
            </label>
            <div className="relative">
              <input 
                type="time"
                id="time"
                value={timestart}
                onChange={(e) => setTimeStart(e.target.value)}
                className="w-full p-2 border rounded-lg pl-10"
                disabled={isLoading}
              />
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>

            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
              end time
            </label>
            <div className="relative">
              <input 
                type="time"
                id="time"
                value={timeend}
                onChange={(e) => setTimeEnd(e.target.value)}
                className="w-full p-2 border rounded-lg pl-10"
                disabled={isLoading}
              />
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>
        </div>

        {/* Event Location */}
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input 
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter event location"
            className="w-full p-2 border rounded-lg"
            disabled={isLoading}
          />
        </div>

        {/* Event Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea 
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your event..."
            className="w-full p-2 border rounded-lg resize-none h-24"
            disabled={isLoading}
          />
        </div>

        {/* Submit Button */}
        <button 
          onClick={handleSubmitEvent}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 animate-spin" />
          ) : (
            <Upload className="mr-2" />
          )}
          Create Event
        </button>

        {/* Events Grid */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
          {isLoading && events.length === 0 ? (
            <div className="flex justify-center items-center">
              <Loader2 className="animate-spin text-blue-500" size={48} />
            </div>
          ) : events.length === 0 ? (
            <p className="text-gray-500 text-center">No events scheduled</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.map(event => (
                <div 
                  key={event._id} 
                  className="relative bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group"
                >
                  {event.imageURL ? (
                    <img 
                      src={event.imageURL} 
                      alt={event.title} 
                      className="w-full h-40 object-cover"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                      <Calendar size={48} className="text-gray-400" />
                    </div>
                  )}
                  <div className="p-3">
                    <h4 className="font-bold truncate">{event.title}</h4>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Calendar size={14} className="mr-1" />
                      <span>{formatDate(event.date)}</span>
                      {event.timestart && (
                        <>
                          <Clock size={14} className="ml-2 mr-1" />
                          <span>{event.timestart}</span>
                        </>
                      )}
                    </div>
                    {event.location && (
                      <p className="text-sm text-gray-600 mt-1 truncate">{event.location}</p>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <button 
                      onClick={() => openEventModal(event)}
                      className="bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Eye size={24} className="text-blue-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-auto">
            {selectedEvent.imageURL ? (
              <img 
                src={selectedEvent.imageURL} 
                alt={selectedEvent.title} 
                className="w-full h-64 object-cover rounded-t-lg"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-t-lg">
                <Calendar size={64} className="text-gray-400" />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-2xl font-bold mb-2">{selectedEvent.title}</h3>
              
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span>{formatDate(selectedEvent.date)}</span>
                </div>
                
                {selectedEvent.timestart && (
                  <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span>{selectedEvent.timestart}</span>
                  </div>
                )}
                
                {selectedEvent.location && (
                  <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                    {selectedEvent.location}
                  </div>
                )}
              </div>
              
              {selectedEvent.description && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-1">Description</h4>
                  <p className="text-gray-800">{selectedEvent.description}</p>
                </div>
              )}
              
              <div className="flex space-x-4">
                <button 
                  onClick={closeEventModal}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Close
                </button>
                <button 
                  onClick={() => handleDeleteEvent(selectedEvent._id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mx-auto animate-spin" />
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;