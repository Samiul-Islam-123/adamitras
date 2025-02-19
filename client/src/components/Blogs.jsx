import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { EffectCoverflow, Navigation } from "swiper/modules";
import { FaArrowLeft, FaArrowRight, FaRegNewspaper } from "react-icons/fa";
import BlogCards from "./BlogCards";

const blogData = [
    { title: "Blog 1", desc: "Description for blog 1", img: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" },
    { title: "Blog 2", desc: "Description for blog 2", img: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" },
    { title: "Blog 3", desc: "Description for blog 3", img: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" },
    { title: "Blog 4", desc: "Description for blog 4", img: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" },
    { title: "Blog 5", desc: "Description for blog 5", img: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" },
    { title: "Blog 6", desc: "Description for blog 6", img: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" },
    { title: "Blog 7", desc: "Description for blog 7", img: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" },
];

const Blogs = () => {
    return (
        <>
            <section className="relative w-screen h-screen flex flex-col  items-center justify-center  ">
                <div className=" absolute top-1/2 -translate-y-3/4 left-0  w-full  flex items-center justify-center flex-col">
                    <h3 className="md:text-5xl text-3xl mt-36 font-semibold mb-10 vina-sans ">
                        Recent Blogs
                    </h3>

                    <div className="relative w-[90%] flex items-center justify-center">
                        <div className=" md:w-[90%] w-[100%] flex justify-center  ">
                            {/* Swiper Component */}
                            <Swiper
                                modules={[EffectCoverflow, Navigation]}
                                effect="coverflow"
                                centeredSlides={true}
                                slidesPerView={3}
                                loop={true}
                                coverflowEffect={{
                                    rotate: 0,
                                    stretch: 0,
                                    depth: 100,
                                    modifier: 2,
                                    slideShadows: false,
                                }}
                                navigation={{
                                    nextEl: ".next-btn",
                                    prevEl: ".prev-btn",
                                }}
                                className="w-[75%]"
                                
                            >
                                {blogData.map((blog, index) => (
                                    <SwiperSlide key={index}>
                                        <BlogCards blog={blog} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        {/* Navigation Controls */}
                        <button className="prev-btn absolute top-1/2 left-0 z-10 transform -translate-y-1/2 bg-black text-white p-2 rounded-full">
                            <FaArrowLeft />
                        </button>
                        <button className="next-btn absolute top-1/2 right-0 z-10 transform -translate-y-1/2 bg-black text-white p-2 rounded-full">
                            <FaArrowRight />
                        </button>
                    </div>
                </div>
            </section>
            <section className=" w-screen min-h-screen overflow-hidden pt-8 md:px-20 px-5">
                <h3 className="md:text-5xl text-3xl vina-sans font-semibold mb-6">All Blogs</h3>
                <div className=" w-full flex flex-wrap ">
                    {blogData.map((blog) => (
                        <BlogCards blog={blog} />
                    ))}
                </div>
            </section>
        </>
    );
};

export default Blogs;
