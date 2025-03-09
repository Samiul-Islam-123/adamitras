import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { EffectCoverflow, Navigation } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import BlogCards from "./BlogCards";

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/blog/blogs`);
                setBlogs(response.data.data);
            } catch (err) {
                setError("Failed to fetch blogs");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) return <div className="w-screen h-screen flex items-center justify-center"><p className="text-center">Loading blogs...</p></div>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <>
            <section className="relative w-screen h-screen flex flex-col  items-center justify-center  ">
                <div className=" absolute top-1/2 -translate-y-3/4 left-0  w-full  flex items-center justify-center flex-col">
                    {/* <h3 className="md:text-5xl text-3xl mt-36 font-semibold mb-10 vina-sans ">
                        Recent Blogs
                    </h3> */}
                <h1 className=" md:text-3xl font-medium text-2xl text-center my-4 mt-20 mb-5">Recent Blogs</h1>


                    <div className="relative w-[90%] flex items-center justify-center">
                        <div className="md:w-[90%] w-[100%] flex justify-center">
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
                                {
                                    blogs && (<>
                                        {blogs.map((blog, index) => (
                                    <SwiperSlide key={index}>
                                        <BlogCards blog={blog} />
                                    </SwiperSlide>
                                ))}
                                    </>)
                                }
                            </Swiper>
                        </div>
                        <button className="prev-btn absolute top-1/2 left-0 z-10 transform -translate-y-1/2 bg-black text-white p-2 rounded-full">
                            <FaArrowLeft />
                        </button>
                        <button className="next-btn absolute top-1/2 right-0 z-10 transform -translate-y-1/2 bg-black text-white p-2 rounded-full">
                            <FaArrowRight />
                        </button>
                    </div>
                </div>
            </section>
            <section className="w-screen min-h-screen overflow-hidden py-10 pt-8 md:px-20 px-5">
                {/* <h3 className="md:text-5xl text-3xl vina-sans font-semibold mb-6">All Blogs</h3> */}
                <h1 className=" md:text-3xl font-medium text-2xl text-center my-4 mt-20 mb-5">All Blogs</h1>

                <div className="w-full flex justify-center mt-10 flex-wrap">
                    {blogs.map((blog) => (
                        <BlogCards key={blog._id} blog={blog} />
                    ))}
                </div>
            </section>
        </>
    );
};

export default Blogs;
