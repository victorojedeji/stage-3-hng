import React, { useState } from "react";
import { AiOutlineFilter, AiOutlineLogout } from "react-icons/ai";
import useLogout from "../hooks/auth";



export default function Navbar({ onFilterImages }) {
  const { logout, isLogoutLoading } = useLogout();
  const [tagInput, setTagInput] = useState("");

  const handleTagInputChange = (e) => {
    const inputText = e.target.value;
    setTagInput(inputText);
  };

  const handleFilterButtonClick = () => {
    onFilterImages(tagInput.toLowerCase());
  };

  const handleLogout = () => {
    logout();
    }

  return (
    <nav className="w-full py-6 px-3 lg:px-8 bg-[#1d2951] flex flex-col justify-center md:flex-row items-center border-b border-slate-600 mb-4">
      <h1 className="font-bold text:3xl text-white mr-1 lg:mr-3 whitespace-nowrap mb-3 lg:mb-0">
        Gallery
      </h1>
      <div className="flex md:ml-auto justify-between w-[100%]">
        <div className="flex items-center gap-1 mr-6 md:mr-8">
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
          onClick={handleLogout}
          disabled={isLogoutLoading ? true : false}
        >
          <AiOutlineLogout className="text-xl" />
          <span className="hidden lg:block">Signout</span>
        </button>
      </div>
    </nav>
  );
}
