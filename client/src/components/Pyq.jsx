import React, { useState, useEffect } from 'react';
import ShowPyqs from './ShowPyqs';
import axios from 'axios';

const Pyq = () => {
  const [show, setShow] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  const engineeringCourses = [
    "ComputerScience",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Civil Engineering",
    "Electronics and Communication Engineering",
    "Bachelor in Computer Application"
  ];

  const semesters = ["Sem1", "Sem2", "Sem3", "Sem4"];

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
    setSelectedSemester(""); // Reset semester when course changes
    setSelectedSubject(""); // Reset subject when course changes
    setSubjects([]); // Clear subjects
  };

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
    setSelectedSubject(""); // Reset subject when semester changes
  };

  const handleSubjectChange = (e) => {
    const selectedSubjectId = e.target.value;
    const selectedSubject = subjects.find(
      (subject) => subject.id === selectedSubjectId
    );
    setSelectedSubject(selectedSubject ? selectedSubject.name : "");
  };

  const fetchSubjects = async () => {
    if (selectedCourse && selectedSemester) {
      setLoadingSubjects(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/drive/subjects/${selectedCourse}/${selectedSemester}`
        );
        setSubjects(response.data.subjects);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        setLoadingSubjects(false);
      }
    }
  };

  useEffect(() => {
    if (selectedCourse && selectedSemester) {
      fetchSubjects();
    }
  }, [selectedCourse, selectedSemester]);

  return (
    <section className="w-screen h-screen relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 md:mt-5 md:w-[40%] w-[85%] border-[#EFC740] border-2 shadow-md shadow-black/20 flex items-center justify-center flex-col gap-5 rounded-3xl bg-[#FFF4CE] py-20">
        <h1 className="text-3xl mb-5 font-bold text-[#f5c72f]">Select Your Need</h1>

        {/* Course Selection */}
        <select
          value={selectedCourse}
          onChange={handleCourseChange}
          className="w-[200px] border-[#EFC740] border-2 py-2 px-4 rounded-xl"
        >
          <option value="" disabled>
            Select Course
          </option>
          {engineeringCourses.map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>

        {/* Semester Selection (Only Show If Course Is Selected) */}
        {selectedCourse && (
          <select
            value={selectedSemester}
            onChange={handleSemesterChange}
            className="w-[200px] border-[#EFC740] border-2 py-2 px-4 rounded-xl"
          >
            <option value="" disabled>
              Select Semester
            </option>
            {semesters.map((semester, index) => (
              <option key={index} value={semester}>
                {semester}
              </option>
            ))}
          </select>
        )}

        {/* Subject Selection (Only Show If Semester Is Selected) */}
        {selectedSemester && (
          <select
            onChange={handleSubjectChange}
            className="w-[200px] py-2 border-[#EFC740] border-2 px-4 rounded-xl"
          >
            <option value="" disabled>
              Select Subject
            </option>
            {loadingSubjects ? (
              <option>Loading subjects...</option>
            ) : (
              subjects.map((subject, index) => (
                <option key={index} value={subject.id}>
                  {subject.name}
                </option>
              ))
            )}
          </select>
        )}

        {/* Done Button (Only Show If Subject Is Selected) */}
        {selectedSubject && (
          <button
            onClick={handleClick}
            className="w-[200px] shadow-sm shadow-white/20 text-white bg-[#f5c72f] py-2 px-4 rounded-xl"
          >
            Done
          </button>
        )}
      </div>

      {show && (
        <ShowPyqs
          handleclick={handleClick}
          selectedCourse={selectedCourse}
          selectedSemester={selectedSemester}
          selectedSubject={selectedSubject}
        />
      )}
    </section>
  );
};

export default Pyq;
