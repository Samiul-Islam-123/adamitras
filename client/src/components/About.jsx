import React from "react";
import img from '/assets/about.png'

const About = () => {
    return (
        <section className=" w-screen min-h-screen md:px-[10vw] px-[6vw] py-[5vw] flex  md:flex-row flex-col  overflow-hidden">
            <div className=" md:w-1/2 w-full">
                <h1 className=" md:text-8xl text-5xl hurricane bg-[url('/assets/bg.png')] bg-no-repeat  bg-cover w-fit">About us</h1>
                <p className=" md:text-lg text-xs  px-1 md:mt-20 mt-10 ">
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

            </div>

            <div className="md:w-1/2 flex md:flex-row flex-col items-center justify-center">
                <img className=" w-full" src={img} alt="" />
            </div>


        </section>
    );
};

export default About;
