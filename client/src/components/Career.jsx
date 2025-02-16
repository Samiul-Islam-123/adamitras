import React from 'react';
import { FaMapSigns, FaBriefcase, FaCalendarAlt, FaHourglassHalf } from 'react-icons/fa';

const Career = () => {
  const options = [
    { name: 'Roadmaps', color: 'bg-blue-500', icon: <FaMapSigns size={40} /> },
    { name: 'Internship Opportunities', color: 'bg-green-500', icon: <FaBriefcase size={40} /> },
    { name: 'Events', color: 'bg-purple-500', icon: <FaCalendarAlt size={40} /> },
    { name: 'Coming Soon', color: 'bg-gray-300', icon: <FaHourglassHalf size={40} /> },
  ];

  return (
    <section className='w-screen h-screen flex items-center justify-center'>
      <div className='grid grid-cols-2 gap-6 -mt-20'>
        {options.map((option, index) => (
          <div
            key={index}
            className={`w-[25vw] h-[25vh] flex flex-col items-center justify-center text-white text-2xl font-semibold rounded-2xl shadow-lg transition-transform transform hover:scale-105 cursor-pointer ${option.color}`}
          >
            {option.icon}
            <h1 className='text-center mt-2'>
              {option.name}
            </h1>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Career;