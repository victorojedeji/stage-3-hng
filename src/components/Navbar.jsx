import React, { useState } from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { AiOutlineFilter, AiOutlineLogout } from "react-icons/ai";



export default function Navbar({ onFilterImages }) {
  const { logout, isLogoutLoading } = useSignOut();
  const [tagInput, setTagInput] = useState("");

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleFilterButtonClick = () => {
    onFilterImages(tagInput);
  };


  return (
    <nav className="w-full py-6 px-3 lg:px-8 bg-[#1d2951] flex flex-col justify-center md:flex-row items-center border-b border-slate-600 mb-4">
      <h1 className="font-bold text:3xl text-white mr-1 lg:mr-3 whitespace-nowrap mb-3 lg:mb-0">
        Gallery
      </h1>
      <div className="flex md:ml-auto ">
        <div className="flex items-center gap-1 mr-2 md:mr-8">
          <input
            type="text"
            placeholder="Filter..."
            className="ml-6 py-1 px-2 md:py-2 md:px-3 rounded-full bg-transparent text-white placeholder:text-white border-2 w-[150px] md:w-[300px]"
            value={tagInput}
            onChange={handleTagInputChange}
          />
          <button
            onClick={handleFilterButtonClick}
            className="border-2 text-white py-1 px-3 md:py-2 md:px-6 rounded-full flex gap-2 items-center hover:bg-[#263460] active:bg-[#182244]"
          >
            <AiOutlineFilter className="text-xl" />
            <span className="hidden lg:block">Filter</span>
          </button>
        </div>

        <button
          className={` ${
            isLogoutLoading ? "opacity-50" : "opacity-100"
          } flex gap-2 items-center text-white ml-auto border-2 border-white py-1 px-3 md:py-2 md:px-6  rounded-full hover:bg-red-600 active:bg-red-800`}
          onClick={logout}
          disabled={isLogoutLoading ? true : false}
        >
          <AiOutlineLogout className="text-xl" />
          <span className="hidden lg:block">Signout</span>
        </button>
      </div>
    </nav>
  );
}
