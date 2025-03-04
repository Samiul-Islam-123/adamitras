import React from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router";

const Sidebar = ({ setActiveTab }) => {
    const menuItems = ["Blogs", "Create Blogs", "Internships", "Events"];
    return (
      <aside className="w-64 bg-gray-800 h-screen p-4 text-white">
        {menuItems.map((item) => (
          <NavLink
            key={item}
            to={`/${item.toLowerCase().replace(/ /g, "")}`}
            className={({ isActive }) =>
              `block p-3 my-2 rounded-md transition-all duration-300 ${
                isActive ? "bg-gray-700" : "hover:bg-gray-600"
              }`
            }
          >
            {item}
          </NavLink>
        ))}
      </aside>
    );
  };

export default Sidebar