import React from "react";
import img from '/assets/about.png'
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import Marquee from "react-fast-marquee";

const About = () => {
  const team = [
    {
      logo: '/assets/logo.png',
      name: 'Arun Das',
      designation: "27' Batch BTech CSE",
    },
    {
      logo: '/assets/logo.png',
      name: 'Arun Das',
      designation: "27' Batch BTech CSE",
    },
    {
      logo: '/assets/logo.png',
      name: 'Arun Das',
      designation: "27' Batch BTech CSE",
    },
    {
      logo: '/assets/logo.png',
      name: 'Arun Das',
      designation: "27' Batch BTech CSE",
    },
    {
      logo: '/assets/logo.png',
      name: 'Arun Das',
      designation: "27' Batch BTech CSE",
    },
    {
      logo: '/assets/logo.png',
      name: 'Arun Das',
      designation: "27' Batch BTech CSE",
    },
    {
      logo: '/assets/logo.png',
      name: 'Arun Das',
      designation: "27' Batch BTech CSE",
    },
    {
      logo: '/assets/logo.png',
      name: 'Arun Das',
      designation: "27' Batch BTech CSE",
    },
    {
      logo: '/assets/logo.png',
      name: 'Arun Das',
      designation: "27' Batch BTech CSE",
    },
    {
      logo: '/assets/logo.png',
      name: 'Arun Das',
      designation: "27' Batch BTech CSE",
    },
    {
      logo: '/assets/logo.png',
      name: 'Arun Das',
      designation: "27' Batch BTech CSE",
    },
    {
      logo: '/assets/logo.png',
      name: 'Arun Das',
      designation: "27' Batch BTech CSE",
    },
    
  ]
  const founders = [
    {
      name: "Mainak Ghosh",
      designation: "25' Batch BTech CSE",
      image: "/assets/founder1.jpg",
      socialLinks: {
        linkedin: "#",
        github: "#",
        instagram: "#",
      },
    },
    {
      name: "Saptadeep Chaudhury",
      designation: "25' Batch BTech ECE",
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
      name: "MD. Samiul Islam",
      designation: "27' Batch BTech CSE",
      image: "/assets/tech1.jpg",
      socialLinks: {
        linkedin: "#",
        github: "#",
        instagram: "#",
      },
    },
    {
      name: "Sourish Samanta",
      designation: "27' Batch BTech CSE",
      image: "/assets/tech2.jpg",
      socialLinks: {
        linkedin: "#",
        github: "#",
        instagram: "#",
      },
    },
    {
      name: "Samriddhi Sinha",
      designation: "27' Batch BTech CSE",
      image: "/assets/tech3.jpg",
      socialLinks: {
        linkedin: "#",
        github: "#",
        instagram: "#",
      },
    },
    {
      name: "Aviroop Pal",
      designation: "27' Batch BTech CSE",
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
      <section className=" w-screen min-h-screen md:px-[10vw] px-[6vw] md:py-[8vw] py-[50vw] flex   flex-col  overflow-hidden">

        {/* <h1 className=" md:text-8xl text-5xl hurricane bg-[url('/assets/bg.png')] bg-no-repeat  bg-cover w-fit">About us</h1> */}
        <h1 className=" md:text-3xl font-medium text-2xl mb-10 text-center">About Us</h1>
        <p className=" text-center md:text-lg text-xs  px-1 md:mt-12 mt-5 font-light italic">“We make a living by what we get, but we make a life by what we give.”<br /><i className=" font-extralight"> - Winston Churchill</i></p>
        <p className=" text-center md:text-lg text-xs  px-1 md:mt-5 mt-2 ">
          At Adamitras, we are dedicated to empowering STEM students with the resources they need to excel academically and professionally. Our platform provides curated insights into industry trends, career roadmaps, and essential skill sets to help students make informed career choices. We also offer a comprehensive database of previous year question papers and sample papers, ensuring academic preparedness. Additionally, we keep students updated on global internship opportunities, bridging the gap between education and industry.
        </p>






      </section>

      <section className="w-full min-h-[40vh] flex flex-col items-center px-6 py-12">
        <h1 className="md:text-2xl font-medium text-xl mb-10 text-center">
          Team
        </h1>

        <Marquee gradient={true} gradientWidth={500} speed={30}>
          {team.map((e) => (
            <div className=" flex flex-col items-center gap-2 mx-10">
              <img key={e.index} src={e.logo} className="h-16" />
              <h1 className=" text-md">{e.name}</h1>
              <p className=" text-xs">{e.designation}</p>
            </div>
          ))}
        </Marquee>

      </section>
      {/* Co-Founders Section */}
      <section className="w-full min-h-[60vh] flex flex-col items-center px-6 py-12">
        <h1 className="md:text-3xl font-medium text-2xl text-center">
          Founders
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
      <section className="w-full min-h-[60vh] flex flex-col items-center px-6 py-12">
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
