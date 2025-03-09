import React, { useState, useEffect } from "react";
import { FaMapSigns } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import axios from "axios";
import { IoIosCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const Roadmap = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.timeline()
      .to(".elem", { height: "100%", duration: 1.5, ease: "expo.inOut" })
      .to(".elem", { height: "0%", duration: 1, ease: "expo.inOut" })
      .to(".show", { opacity: 1 });

    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/drive/roadmaps`);
      setRoadmaps(response.data.roadmaps);
    } catch (error) {
      setError("Failed to fetch roadmaps.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSeeClick = (pdfUrl) => {
    const match = pdfUrl.match(/\/d\/(.*?)\//);
    if (match && match[1]) {
      setSelectedPdf(`https://drive.google.com/file/d/${match[1]}/preview`);
    } else {
      console.error("Invalid Google Drive URL");
    }
  };

  return (
    <div className="z-30 relative w-screen h-screen bg-white flex flex-col px-8 py-16">
      <div className="elem absolute w-screen h-[0%] text-white top-0 left-0 z-30 bg-blue-500 flex flex-col items-center justify-center">
        <FaMapSigns size={40} />
        <h1 className="text-center mt-2 text-4xl ">Roadmaps</h1>

      </div>

      <div className=" show opacity-0 w-full h-full ">
        <div className="  w-full">
          <button
            className=" mb-5 p-2 rounded-full border border-black"
            onClick={() => navigate("/career")}
          >
            <MdOutlineArrowBack size={25} />
          </button>

          {/* <h2 className="text-5xl md:text-8xl hurricane">Roadmaps</h2> */}
          <h1 className=" md:text-4xl font-medium text-3xl text-center ">Roadmaps</h1>
        </div>

        {/* Loading and Error Handling */}
        {loading ? (
          <p className="text-center mt-5">Loading roadmaps...</p>
        ) : error ? (
          <p className=" text-3xl mt-10 text-black/40">No Roadmaps Yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {roadmaps.map((roadmap) => (
              <div
                key={roadmap.id}
                className="p-5 bg-gray-100 shadow-lg rounded-lg cursor-pointer hover:bg-gray-200 transition"
                onClick={() => handleSeeClick(roadmap.viewLink)}
              >
                <h3 className="text-xl font-semibold">{roadmap.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PDF Viewer */}
      {selectedPdf && (
        <div className="absolute inset-0 flex justify-center items-center z-50 bg-black/50">
          <div className="bg-white p-4 rounded-lg w-[90%] h-[90%] relative">
            <button
              onClick={() => setSelectedPdf(null)}
              className="absolute -top-3 -right-3 bg-red-500 text-white p-1 rounded-full"
            >
              <IoIosCloseCircle size={30} />
            </button>

            <iframe allowFullScreen={false}
              sandbox="allow-scripts allow-same-origin allow-forms" src={selectedPdf} className="w-full h-full" title="PDF Viewer"></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roadmap;
