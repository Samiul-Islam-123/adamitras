import React, { useState } from 'react';
import effect from '/assets/navEffect.svg';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const [activeTab, setActiveTab] = useState(null); // State to track the active tab
  const navigate = useNavigate();
  const handleTabClick = (tab) => {
    setActiveTab(tab); // Set the active tab when clicked
  };

  return (
    <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 md:w-[70vw] w-[90vw] md:h-[12vh] h-[6vh] rounded-2xl md:rounded-3xl flex items-center border-yellow-500 border-b-2 md:border-b-4">
      <ul className="w-full flex justify-between md:text-xl px-2 md:px-16 md:gap-7 text-sm">
        {['Home', 'Blogs', 'PYQs', 'Career', 'Others'].map((tab) => (
          <li key={tab} onClick={() => {
            handleTabClick(tab)
            navigate(tab.toLowerCase())
            }} className="cursor-pointer">
            <span className="flex items-center justify-center px-8 py-3 relative ">
              <p className="z-10">{tab}</p>
              {activeTab === tab && (
                <img
                  src={effect}
                  alt=""
                  className="opacity-100 absolute" // Add animation class
                />
              )}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
