import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router";
import { useState } from "react";
import Blogs from "./Components/Blogs";

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="p-6">
            <Routes>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/createblogs" element={<CreateBlogs />} />
              <Route path="/internships" element={<Internships />} />
              <Route path="/events" element={<Events />} />
              <Route path="/" element={<Blogs />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;