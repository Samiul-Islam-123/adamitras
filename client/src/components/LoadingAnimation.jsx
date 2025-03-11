import gsap from 'gsap';
import React, { useEffect } from 'react'

const LoadingAnimation = () => {
    useEffect(() => {
        const texts = ["Roadmaps", "PYQs", "Internships", "Welcome."];
        var tl = gsap.timeline({ delay: 0.5 });
    
        gsap.set(".down-txt", { y: 100 });
        gsap.set(".fs-text", { y: 120 });
    
        texts.forEach((text, index) => {
            tl.to(`.fs-text-${index}`, {
                y: 0,
                duration: 0.2,
                ease: "expo.inOut",
            });
            if (index !== 3) {
                tl.to(`.fs-text-${index}`, {
                    y: -120,
                    duration: 0.5,
                    delay: 0.1,
                    ease: "expo.inOut",
                });
            }
        });
    
        tl.to(".fs", {
            height: "0%",
            duration: 2,
            delay: 0.8,
            ease: "expo.inOut",
        })
            .to(".elem", {
                height: "100%",
                delay: -2,
                duration: 1.5,
                ease: "expo.inOut",
            })
            // .to(".yellow-txt", {
            //     y: 0,
            //     duration: 0.5,
            //     ease: "power1.inOut",
            // })
            // .to(".yellow-txt", {
            //     y: 100,
            //     delay: 0.8,
            //     duration: 0.5,
            //     ease: "expo.inOut",
            // })
            .to(".elem", {
                height: "0%",
                delay: -0.5,
                duration: 1,
                ease: "expo.inOut",
            });
    }, []);
  return (
    <>
    <div className="fs z-20 w-full h-full bg-zinc-900 fixed top-0 left-0 flex items-center justify-center overflow-hidden">
                {["Roadmaps", "PYQs", "Internships", "Welcome."].map(
                    (text, index) => (
                        <span
                            key={index}
                            className="absolute overflow-hidden px-5"
                        >
                            <h1
                                className={`fs-text fs-text-${index} md:text-[4.5vw] text-[10vw] hurricane text-white`}
                            >
                                {text}
                            </h1>
                        </span>
                    )
                )}
            </div>
            <div className="elem z-20 w-full h-0 bg-yellow-500 fixed bottom-0 left-0 flex items-center justify-center overflow-hidden">
                <span className=" overflow-hidden relative h-fit">
                    <h1 className="yellow-txt down-txt md:text-[4.5vw] text-[10vw] vina-sans relative ">
                        ADAMAS UNIVERSITY
                    </h1>
                </span>
            </div>
    </>
  )
}

export default LoadingAnimation