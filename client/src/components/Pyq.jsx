import React, { useState, useEffect } from 'react';
import ShowPyqs from './ShowPyqs';
import axios from 'axios';

const Pyq = () => {
  const [show, setShow] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  
  // State for dynamically fetched options
  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  
  // Loading states
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingSemesters, setLoadingSemesters] = useState(false);
  const [loadingSubjects, setLoadingSubjects] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  // Fetch courses when component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      setLoadingCourses(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/drive/courses`
        );
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, []);

  // Handle course selection
  const handleCourseChange = (e) => {
    const courseName = e.target.value;
    setSelectedCourse(courseName);
    setSelectedSemester(""); // Reset semester when course changes
    setSelectedSubject(""); // Reset subject when course changes
    setSubjects([]); // Clear subjects
  };

  // Fetch semesters when course selection changes
  useEffect(() => {
    const fetchSemesters = async () => {
      if (selectedCourse) {
        setLoadingSemesters(true);
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/drive/semesters/${selectedCourse}`
          );
          setSemesters(response.data.semesters);
        } catch (error) {
          console.error("Error fetching semesters:", error);
        } finally {
          setLoadingSemesters(false);
        }
      }
    };

    if (selectedCourse) {
      fetchSemesters();
    } else {
      setSemesters([]);
    }
  }, [selectedCourse]);

  // Handle semester selection
  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
    setSelectedSubject(""); // Reset subject when semester changes
  };

  // Handle subject selection
  const handleSubjectChange = (e) => {
    const selectedSubjectId = e.target.value;
    const selectedSubject = subjects.find(
      (subject) => subject.id === selectedSubjectId
    );
    setSelectedSubject(selectedSubject ? selectedSubject.name : "");
  };

  // Fetch subjects when course and semester selections change
  useEffect(() => {
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

    if (selectedCourse && selectedSemester) {
      fetchSubjects();
    } else {
      setSubjects([]);
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
          disabled={loadingCourses}
        >
          <option value="" disabled>
            {loadingCourses ? "Loading courses..." : "Select Course"}
          </option>
          {courses.map((course) => (
            <option key={course.id} value={course.name}>
              {course.name}
            </option>
          ))}
        </select>

        {/* Semester Selection (Only Show If Course Is Selected) */}
        {selectedCourse && (
          <select
            value={selectedSemester}
            onChange={handleSemesterChange}
            className="w-[200px] border-[#EFC740] border-2 py-2 px-4 rounded-xl"
            disabled={loadingSemesters}
          >
            <option value="" disabled>
              {loadingSemesters ? "Loading semesters..." : "Select Semester"}
            </option>
            {semesters.map((semester) => (
              <option key={semester.id} value={semester.name}>
                {semester.name}
              </option>
            ))}
          </select>
        )}

        {/* Subject Selection (Only Show If Semester Is Selected) */}
        {selectedSemester && (
          <select
            value={selectedSubject ? subjects.find(s => s.name === selectedSubject)?.id || "" : ""}
            onChange={handleSubjectChange}
            className="w-[200px] py-2 border-[#EFC740] border-2 px-4 rounded-xl"
            disabled={loadingSubjects}
          >
            <option value="" disabled>
              {loadingSubjects ? "Loading subjects..." : "Select Subject"}
            </option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
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