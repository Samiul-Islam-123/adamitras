import { useState } from "react";
import axios from "axios";
import { PYQ } from "./PYQ";
import  Blog  from "./Blog";

function Sidebar({ setTab }) {
  return (
    <div style={{ width: "200px", padding: "20px", background: "#f4f4f4", height: "100vh" }}>
      <button onClick={() => setTab("blog")} style={buttonStyle}>Blog</button>
      <button onClick={() => setTab("pyq")} style={buttonStyle}>PYQ</button>
    </div>
  );
}

const buttonStyle = {
  display: "block",
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  border: "none",
  cursor: "pointer",
  background: "#007bff",
  color: "white",
};





function Panel() {
  const [tab, setTab] = useState("blog");
  return (
    <div style={{ display: "flex" }}>
      <Sidebar setTab={setTab} />
      <div style={{ padding: "20px", flex: 1 }}>
        {tab === "blog" ? <Blog /> : <PYQ />}
      </div>
    </div>
  );
}

export default Panel;
