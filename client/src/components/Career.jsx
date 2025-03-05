import React from 'react';
import { FaMapSigns, FaBriefcase, FaCalendarAlt, FaHourglassHalf } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const Career = () => {
  const navigate = useNavigate();
  const options = [
    { name: 'Roadmaps', color: 'bg-blue-500', icon: <FaMapSigns size={40} />, path: 'roadmaps' },
    { name: 'Internship Opportunities', color: 'bg-green-500', icon: <FaBriefcase size={40} />, path: 'internship-opportunities' },
    { name: 'Events', color: 'bg-purple-500', icon: <FaCalendarAlt size={40} />, path: 'events' },
    { name: 'Coming Soon', color: 'bg-gray-300', icon: <FaHourglassHalf size={40} />, path: 'career' },
  ];

  return (
    <section className='w-screen h-screen flex items-center justify-center flex-col'>
      <div className='grid grid-cols-2 gap-6 -mt-20'>
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
      </div>

     
    </section>
  );
};

export default Career;
