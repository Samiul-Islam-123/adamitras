import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const ShowPyqs = ({ handleclick, selectedCourse, selectedSemester, selectedSubject }) => {
  const [pyqs, setPyqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null); // New state for selected PDF

  useEffect(() => {
    if (selectedCourse && selectedSemester && selectedSubject) {
      fetchPyqs();
    }
  }, [selectedCourse, selectedSemester, selectedSubject]);

  const fetchPyqs = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log(`${import.meta.env.VITE_API_URL}/drive/files/${selectedCourse}/${selectedSemester}/${selectedSubject}`);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/drive/files/${selectedCourse}/${selectedSemester}/${selectedSubject}`
      );
      console.log(response.data.files);
      setPyqs(response.data.files);
    } catch (error) {
      setError("Failed to fetch PYQs. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSeeClick = (pdfUrl) => {
    setSelectedPdf(pdfUrl); // Set the selected PDF URL
  };

  return (
    <div className="absolute top-0 left-0 z-20 w-screen h-screen bg-black/15 flex pt-32 justify-center">
      <div className="flex w-full h-[70%] justify-center">
        <div className="md:w-[60%] w-[80%] bg-[#FFF4CE] border-4 border-[#EFC740] rounded-3xl">
          <div className="flex gap-3 md:p-20 py-6 px-2">
            <input
              type="text"
              className="focus:outline-none py-2 md:px-3 px-2 w-60 border-2 border-[#EFC740] rounded-md"
            />
            <button className="p-3 bg-[#EFC740] rounded-full text-white">
              <FaSearch />
            </button>
          </div>
          <div className="w-full flex-1">
            {loading ? (
              <p>Loading PYQs...</p>
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : (
              <ul>
                {pyqs.length > 0 &&
                  pyqs.map((pyq, index) => (
                    <li
                      key={index} // Ideally use a unique ID like pyq.id if available
                      className="md:mx-16 mx-3 py-3 cursor-pointer flex justify-between border-b border-black/30 text-lg"
                    >
                      <h1 className="font-semibold md:text-lg text-sm">{pyq.name}</h1>
                      <button
                        onClick={() => handleSeeClick(pyq.viewLink)} // Pass the PDF URL to handleSeeClick
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
        <button onClick={() => handleclick()} className="h-fit w-fit p-3">
          X
        </button>
      </div>

      {/* Display selected PDF */}
      {selectedPdf && (
        <div className="absolute inset-0 flex justify-center items-center z-30 bg-black/50">
          <div className="bg-white p-4 rounded-lg w-[80%] h-[80%] overflow-hidden">
            <button
              onClick={() => setSelectedPdf(null)}
              className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full"
            >
              X
            </button>
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
              <Viewer fileUrl={selectedPdf} />
            </Worker>

          </div>
        </div>
      )}
    </div>
  );
};

export default ShowPyqs;
