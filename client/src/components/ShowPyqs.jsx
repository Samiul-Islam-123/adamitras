import React from "react";
import { FaSearch } from "react-icons/fa";


const ShowPyqs = ({handleclick}) => {
    return (
        <div className="absolute top-0 left-0 z-20 w-screen h-screen bg-black/15 flex pt-32 justify-center">
            <div className=" flex w-full  h-[70%]  justify-center">
                <div className=" md:w-[60%] w-[80%]  bg-[#FFF4CE] border-4 border-[#EFC740] rounded-3xl">
                  <div className=" flex gap-3 md:p-20 py-6 px-2">
                    <input type="text" className=" focus:outline-none py-2 md:px-3 px-2 w-60 border-2 border-[#EFC740] rounded-md"/>
                    <button className=" p-3  bg-[#EFC740] rounded-full text-white"><FaSearch /></button>
                  </div>
                  <div className=" w-full flex-1">
                    <ul>
                      <li className=" md:mx-16 mx-3 py-3 cursor-pointer flex justify-between border-b border-black/30 text-lg ">
                        <h1 className=" font-semibold md:text-lg text-sm">Engineering Mathematic-I</h1>
                        <p className="md:text-lg text-sm">2016</p>
                        <button className=" md:px-3 md:py-1 px-10 md:text-lg text-sm bg-[#EFC740] rounded-md text-white md:block hidden ">See</button>
                      </li>
                    </ul>
                  </div>
                </div>
                <button onClick={()=>handleclick()}  className="h-fit w-fit p-3">X</button>
            </div>
        </div>
    );
};

export default ShowPyqs;
