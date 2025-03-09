import React from "react";
import img from '/assets/about.png'
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import Marquee from "react-fast-marquee";
import { HiOutlineMail } from "react-icons/hi";

const About = () => {
  const team = [
    {
      logo: '/assets/team/Aaliya(CSE).jpg',
      name: 'Aaliya Khurshid',
      designation: "CSE (Batch '22-'26)",
    },
    {
      logo: '/assets/team/Ankur(BCA).jpg',
      name: 'Ankur Dutta',
      designation: "BCA (Batch '24-'28)",
    },
    {
      logo: '/assets/team/Sarthak(CSE).jpg',
      name: 'Sarthak Shah',
      designation: "CSE (Batch '21-'25)",
    },
    {
      logo: '/assets/team/Sayani(CSE).jpg',
      name: 'Sayani Das',
      designation: "CSE (Batch '24-'28)",
    },
    {
      logo: '/assets/team/Soham(CSE).png',
      name: 'Soham Maity',
      designation: "CSE (Batch '22-'26)",
    },

    // {
    //   logo: '/assets/logo.png',
    //   name: 'Arun Das',
    //   designation: "27' Batch BTech CSE",
    // },
    // {
    //   logo: '/assets/logo.png',
    //   name: 'Arun Das',
    //   designation: "27' Batch BTech CSE",
    // },
    // {
    //   logo: '/assets/logo.png',
    //   name: 'Arun Das',
    //   designation: "27' Batch BTech CSE",
    // },
    // {
    //   logo: '/assets/logo.png',
    //   name: 'Arun Das',
    //   designation: "27' Batch BTech CSE",
    // },
    // {
    //   logo: '/assets/logo.png',
    //   name: 'Arun Das',
    //   designation: "27' Batch BTech CSE",
    // },
    // {
    //   logo: '/assets/logo.png',
    //   name: 'Arun Das',
    //   designation: "27' Batch BTech CSE",
    // },
    // {
    //   logo: '/assets/logo.png',
    //   name: 'Arun Das',
    //   designation: "27' Batch BTech CSE",
    // },
    // {
    //   logo: '/assets/logo.png',
    //   name: 'Arun Das',
    //   designation: "27' Batch BTech CSE",
    // },
    // {
    //   logo: '/assets/logo.png',
    //   name: 'Arun Das',
    //   designation: "27' Batch BTech CSE",
    // },
    // {
    //   logo: '/assets/logo.png',
    //   name: 'Arun Das',
    //   designation: "27' Batch BTech CSE",
    // },

  ]
  const founders = [
    {
      name: "Mainak Ghosh",
      designation: "CSE (Batch '21-'25)",
      image: "/assets/Mainak_.jpg",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/mainakghosh2/",

        email: "mailto:mainakghosh232@gmail.com ",
      },
    },
    {
      name: "Saptadeep Choudhury",
      designation: "ECE (Batch '21-'25)",
      image: "/assets/saptadeep.png",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/saptadeep-choudhury",

        email: "mailto:schaudhury02@gmail.com ",
      },
    },
  ];

  const techTeam = [
    {
      name: "MD. Samiul Islam",
      designation: "CSE (Batch '23-'27)",
      image: "/assets/tech_team/samiul_.jpeg",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/md-samiul-islam-b98475272/",

        email: "mailto:isamiul099@gmail.com",
      },
    },
    {
      name: "Sourish Samanta",
      designation: "CSE (Batch '23-'27)",
      image: "/assets/tech_team/sourish.jpeg",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/sourish-samanta-b762b42a1/",

        email: "mailto:sourishsamantaofficial@gmail.com",
      },
    },
    {
      name: "Samriddhi Sinha",
      designation: "CSE (Batch '23-'27)",
      image: "/assets/tech_team/samridhhi_.jpg",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/samriddhi-sinha-555768280/",

        email: "mailto:sinhasamriddhi2000@gmail.com",
      },
    },
    {
      name: "Aviroop Pal",
      designation: "CSE (Batch '23-'27)",
      image: "/assets/tech_team/aviroop.jpg",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/aviroop-pal/",

        email: "mailto:avirooppal42@gmail.com",
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

        {/* Static container with properly displayed images */}
        <div className="flex flex-wrap justify-center gap-8">
          {team.map((e, index) => (
            <div key={index} className="flex flex-col items-center gap-2 mx-4 mb-6">
              {/* Changed from object-cover to object-contain */}
              <div className="h-32 w-32 flex items-center justify-center">
                <img src={e.logo} className="max-h-32 max-w-32 object-contain" alt={e.name} />
              </div>
              <h1 className="text-md">{e.name}</h1>
              <p className="text-xs">{e.designation}</p>
            </div>
          ))}
        </div>
      </section>


      {/* <section className="w-full min-h-[40vh] flex flex-col items-center px-6 py-12">
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

      </section> */}
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
                  const Icon = key === "linkedin" ? FaLinkedin : key === "github" ? FaGithub : HiOutlineMail;
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
          Technical Team
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {techTeam.map((member, index) => (
            <div key={index} className="w-64 h-80 flex flex-col items-center bg-white ">
              <div className="w-full h-60 bg-gray-300">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>


              <h2 className="mt-3 text-lg font-semibold">{member.name}</h2>
              <p className="text-sm text-gray-600">{member.designation}</p>
              <ul className="flex gap-3 mt-2">
                {Object.entries(member.socialLinks).map(([key, url]) => {
                  const Icon = key === "linkedin" ? FaLinkedin : key === "github" ? FaGithub : HiOutlineMail;
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
