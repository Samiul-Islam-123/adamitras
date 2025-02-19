import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  const userRole = "admin"; // Change to "moderator" to test different views

  return (
    <>
      <Navbar role={userRole} />
      <Routes>
        {/* Define your route components here */}
      </Routes>
    </>
  );
}

export default App;
