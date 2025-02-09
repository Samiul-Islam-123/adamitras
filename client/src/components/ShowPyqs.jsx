import React from "react";


const ShowPyqs = ({handleclick}) => {
    return (
        <div className="absolute top-0 left-0 z-20 w-screen h-screen bg-black/15 flex pt-32 justify-center">
            <div className=" flex w-full  h-[70%]  justify-center">
                <div className=" w-[60%] bg-[#FFF4CE] border-4 border-[#EFC740] rounded-3xl">
                  <div className=" flex gap-3 p-20">
                    <input type="text" className=" focus:outline-none py-2 px-3 w-60 border-2 border-[#EFC740] rounded-md"/>
                    <button className=" p-3 bg-[#EFC740] rounded-md text-white">Search</button>
                  </div>
                  <div className=" w-full flex-1">
                    <ul>
                      <li className=" mx-16 py-3 cursor-pointer flex justify-between border-b border-black/30 text-lg ">
                        <h1 className=" font-semibold">Engineering Mathematic-I</h1>
                        <p>2016</p>
                        <button className=" px-3 py-1 bg-[#EFC740] rounded-md text-white">See</button>
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
