import React from "react";

const About = () => {
    return (
        <section className=" w-screen h-screen px-[10vw] py-[5vw] flex flex-col overflow-hidden">
            <h1 className=" text-8xl hurricane">About us</h1>
            <p className=" text-xl px-[2vw] mt-20 ">
                Adamitras is a student-driven platform created by two students
                from the Batch of 2021-2025 at Adamas University with a simple
                yet powerful goal—to make academic resources more accessible,
                organized, and useful for students. What started as a basic
                website for sharing Previous Year Question Papers has now
                evolved into a comprehensive hub for academic and career-related
                information, catering to the diverse needs of students. Exams
                can be stressful, especially when students struggle to find the
                right study materials. <br /> <br /> Adamitras was built to
                solve this problem by providing easy access to Previous Year
                Question Papers, ensuring that students can prepare effectively
                and perform better without the hassle of searching for scattered
                resources. By bringing all essential materials under one roof,
                we aim to make exam preparation more structured and efficient.
                Beyond academics, Adamitras is committed to helping students
                navigate their career paths. We regularly publish blogs and
                articles on internships, career prospects, industry trends, and
                skill development, offering valuable insights for students
                looking to enhance their professional journey. Our content is
                written by us and enriched by contributions from other students,
                alumni, and professionals who share our vision of empowering the
                student community.
            </p>

            <p className=" text-xl px-[2vw] mt-20 ">
                {" "}
                At Adamitras, we believe that knowledge grows when shared. Our
                platform fosters a collaborative space where students can not
                only access resources but also contribute their own insights and
                experiences to help their peers. Whether it’s sharing notes,
                writing articles, or providing internship leads, we encourage
                students to be an active part of this growing knowledge base. As
                we continue to expand, our focus remains on making Adamitras a
                trusted, student-friendly platform that supports academic
                success and career growth. We are dedicated to keeping our
                content updated, relevant, and beneficial for all students at
                Adamas University. Join us on this journey to make learning and
                career-building more accessible, insightful, and impactful for
                every student. Together, we can create a stronger, more informed
                academic community at Adamas University.
            </p>
        </section>
    );
};

export default About;
