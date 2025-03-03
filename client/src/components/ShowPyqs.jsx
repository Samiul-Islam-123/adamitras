import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { IoIosCloseCircle } from "react-icons/io";

const ShowPyqs = ({ handleclick, selectedCourse, selectedSemester, selectedSubject }) => {
  const [pyqs, setPyqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);

  useEffect(() => {
    if (selectedCourse && selectedSemester && selectedSubject) {
      fetchPyqs();
    }
  }, [selectedCourse, selectedSemester, selectedSubject]);

  const fetchPyqs = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/drive/files/${selectedCourse}/${selectedSemester}/${selectedSubject}`
      );
      setPyqs(response.data.files);
    } catch (error) {
      setError("Failed to fetch PYQs. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSeeClick = (pdfUrl) => {
    const match = pdfUrl.match(/\/d\/(.*?)\//);
    if (match && match[1]) {
      const fileId = match[1];
      // Use the preview URL which disables downloading capability by default
      // Remove any option to download or print
      const embedUrl = `https://drive.google.com/file/d/${fileId}/preview?usp=drivesdk&rm=minimal`;
      setSelectedPdf(embedUrl);
    } else {
      console.error("Invalid Google Drive URL");
    }
  };

  return (
    <div className="fixed top-0 left-0 z-20 w-screen h-screen bg-black/15 flex xl:pt-20 md:items-start justify-center items-center ">
      <div className="flex w-full h-[80%] justify-center">
        <div className="md:w-[60%] w-[80%] h-[100%] bg-[#FFF4CE] border-4 border-[#EFC740] rounded-3xl  overflow-y-auto hide-scrollbar">
          <div className="flex gap-3 md:p-20 py-6 px-2">
            <input
              type="text"
              className="focus:outline-none py-2 md:px-3 px-2 w-60 border-2 border-[#EFC740] rounded-md"
              placeholder="Search PYQs..."
            />
            <button className="p-3 bg-[#EFC740] rounded-full text-white">
              <FaSearch />
            </button>
          </div>
          <div className="w-full flex-1">
            {loading ? (
              <p className="md:mx-16 mx-3 py-3">Loading PYQs...</p>
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : (
              <ul>
                {pyqs.length > 0 &&
                  pyqs.map((pyq, index) => (
                    <li
                      key={index}
                      className="md:mx-16 mx-3 py-3 cursor-pointer flex justify-between border-b border-black/30 text-lg"
                      onClick={() => handleSeeClick(pyq.viewLink)}
                    >
                      <h1 className="font-semibold md:text-lg text-sm">{pyq.name}</h1>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering parent's onClick
                          handleSeeClick(pyq.viewLink);
                        }}
                        className="md:px-3 md:py-1 px-10 md:text-lg text-sm bg-[#EFC740] rounded-md text-white md:block hidden"
                      >
                        See
                      </button>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
        
        <button
          onClick={handleclick}
          className="absolute md:top-10 md:right-10 top-5 right-5 bg-red-500 text-white p-1 rounded-full"
        >
          <IoIosCloseCircle size={30} />
        </button>
      </div>

      {/* Render PDF Viewer */}
      {selectedPdf && (
        <div className="absolute inset-0 flex justify-center items-center z-30 bg-black/50">
          <div className="bg-white p-4 rounded-lg w-[90%] h-[90%] relative">
            <button
              onClick={() => setSelectedPdf(null)}
              className="absolute -top-3 -right-3 bg-red-500 text-white p-1 rounded-full"
            >
              <IoIosCloseCircle size={30} />
            </button>
            <div className="w-full h-full relative">
              <iframe 
                src={selectedPdf} 
                className="w-full h-full"
                title="PDF Viewer"
                frameBorder="0"
                allowFullScreen={false}
                sandbox="allow-scripts allow-same-origin allow-forms"
              ></iframe>
              {/* Invisible overlay to prevent right-click and other interactions */}
              <div 
                className="absolute inset-0 select-none pointer-events-none"
                style={{backgroundColor: 'transparent'}}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowPyqs;