import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RoutesManager from "./RoutesManager";

function App() {
  const userRole = "admin"; // Change to "moderator" to test different views

  return (
    <>
      <Navbar role={userRole} />
      <RoutesManager />
    </>
  );
}

export default App;
