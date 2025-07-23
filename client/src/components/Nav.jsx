import React, { useState } from 'react';
import effect from '/assets/navEffect.svg';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const [activeTab, setActiveTab] = useState('Home'); // State to track the active tab
  const navigate = useNavigate();
  const handleTabClick = (tab) => {
    setActiveTab(tab); // Set the active tab when clicked
  };

  return (
    <nav className="absolute bottom-10 left-1/2 -translate-x-1/2 md:w-[80vw] w-[90vw] lg:w-[70vw] md:h-[12vh] h-[6vh] rounded-2xl md:rounded-3xl flex items-center border-yellow-500 bg-white border-b-2 md:border-b-4">
      <ul className="w-full flex justify-between md:text-xl px-2 lg:px-16  ">
        {['Home', 'PYQs','Career','About Us'].map((tab) => (
          <li
            key={tab}
            onClick={() => {
              handleTabClick(tab);
              const route = tab === "About Us" ? "/about" : `/${tab.toLowerCase()}`;
              navigate(route);
            }}
            className="cursor-pointer"
          >
            <span className="flex items-center justify-center md:px-8 md:py-3 px-3 py-2 relative">
              <p className="z-10 text-xs md:text-xl">{tab}</p>
              {activeTab === tab && (
                <img src={effect} alt="" className="opacity-100 absolute" />
              )}
            </span>
          </li>

        ))}
      </ul>
    </nav>
  );
};

export default Nav;
