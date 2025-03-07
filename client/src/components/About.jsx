import React from "react";
import img from '/assets/about.png'
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const About = () => {
    const founders = [
        {
          name: "John Doe",
          designation: "Co-Founder",
          image: "/assets/founder1.jpg",
          socialLinks: {
            linkedin: "#",
            github: "#",
            instagram: "#",
          },
        },
        {
          name: "Jane Smith",
          designation: "Co-Founder",
          image: "/assets/founder2.jpg",
          socialLinks: {
            linkedin: "#",
            github: "#",
            instagram: "#",
          },
        },
      ];
      
      const techTeam = [
        {
          name: "Alice Johnson",
          designation: "Frontend Developer",
          image: "/assets/tech1.jpg",
          socialLinks: {
            linkedin: "#",
            github: "#",
            instagram: "#",
          },
        },
        {
          name: "Bob Williams",
          designation: "Backend Developer",
          image: "/assets/tech2.jpg",
          socialLinks: {
            linkedin: "#",
            github: "#",
            instagram: "#",
          },
        },
        {
          name: "Charlie Brown",
          designation: "UI/UX Designer",
          image: "/assets/tech3.jpg",
          socialLinks: {
            linkedin: "#",
            github: "#",
            instagram: "#",
          },
        },
        {
          name: "Daisy Smith",
          designation: "Full-Stack Developer",
          image: "/assets/tech4.jpg",
          socialLinks: {
            linkedin: "#",
            github: "#",
            instagram: "#",
          },
        },
      ];
    return (
        <>
        <section className=" w-screen min-h-screen md:px-[10vw] px-[6vw] py-[8vw] flex   flex-col  overflow-hidden">
            
                {/* <h1 className=" md:text-8xl text-5xl hurricane bg-[url('/assets/bg.png')] bg-no-repeat  bg-cover w-fit">About us</h1> */}
                <h1 className=" md:text-3xl font-medium text-2xl text-center">About Us</h1>
                <p className=" text-center md:text-lg text-xs  px-1 md:mt-20 mt-10 ">
                    Adamitras is a student-driven platform created by two students
                    from the Batch of 2021-2025 at Adamas University with a simple
                    yet powerful goal—to make academic resources more accessible,
                    organized, and useful for students. What started as a basic
                    website for sharing Previous Year Question Papers has now
                    evolved into a comprehensive hub for academic and career-related
                    information, catering to the diverse needs of students.<br /> <br /> 
                    
                     By bringing all essential materials under one roof,
                    we aim to make exam preparation more structured and efficient.
                    Beyond academics, Adamitras is committed to helping students
                    navigate their career paths. 
                </p>

            

            


        </section>
        {/* Co-Founders Section */}
      <section className="w-full min-h-[80vh] flex flex-col items-center px-6 py-12">
        <h1 className="md:text-3xl font-medium text-2xl text-center">
          Co-Founders
        </h1>
        <div className="flex flex-wrap justify-center gap-10 mt-10">
          {founders.map((founder, index) => (
            <div key={index} className="w-64 h-80 flex flex-col items-center bg-white ">
              <div className="w-full h-3/4 bg-gray-300">
                <img src={founder.image} alt={founder.name} className="w-full h-full object-cover" />
              </div>
              <h2 className="mt-3 text-lg font-semibold">{founder.name}</h2>
              <p className="text-sm text-gray-600">{founder.designation}</p>
              <ul className="flex gap-3 mt-2">
                {Object.entries(founder.socialLinks).map(([key, url]) => {
                  const Icon = key === "linkedin" ? FaLinkedin : key === "github" ? FaGithub : FaInstagram;
                  return (
                    <li key={key}>
                      <a href={url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-all">
                        <Icon className="text-gray-700 text-lg" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Team Section */}
      <section className="w-full min-h-screen flex flex-col items-center px-6 py-12">
        <h1 className="md:text-3xl font-medium text-2xl text-center">
          Tech Team
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {techTeam.map((member, index) => (
            <div key={index} className="w-64 h-80 flex flex-col items-center bg-white ">
              <div className="w-full h-3/4 bg-gray-300">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h2 className="mt-3 text-lg font-semibold">{member.name}</h2>
              <p className="text-sm text-gray-600">{member.designation}</p>
              <ul className="flex gap-3 mt-2">
                {Object.entries(member.socialLinks).map(([key, url]) => {
                  const Icon = key === "linkedin" ? FaLinkedin : key === "github" ? FaGithub : FaInstagram;
                  return (
                    <li key={key}>
                      <a href={url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-all">
                        <Icon className="text-gray-700 text-lg" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>
        </>
    );
};

export default About;
