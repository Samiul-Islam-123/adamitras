import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RoutesManager from "./RoutesManager";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar role={userRole} />
      <RoutesManager />
    </>
  )
}

export default App
