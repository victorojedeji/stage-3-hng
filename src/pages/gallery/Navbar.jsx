import React from "react";
import { AiOutlineFilter, AiOutlineLogout } from "react-icons/ai";

export default function Navbar() {
  return (
    <nav className="w-full py-6 px-8 bg-[#1d2951] flex items-center border-b border-slate-600 mb-4">
      <h1 className="font-bold text-2xl text-white mr-3 whitespace-nowrap">My Gallery</h1>
      <form className="flex items-center gap-1">
        <input
          type="text"
          placeholder="Search..."
          className="ml-6 py-2 px-3 rounded-full bg-transparent text-white placeholder:text-white border-2 flex-grow"
        />
        <button className="border-2 text-white py-2 px-6 rounded-full flex gap-2 items-center hover:bg-[#263460] active:bg-[#182244]">
          <AiOutlineFilter className="text-xl" />
          Filter
        </button>
      </form>

      <button className="flex gap-2 items-center text-white ml-auto border-2 border-white py-2 px-6 rounded-full hover:bg-red-600 active:bg-red-800">
        <AiOutlineLogout className="text-xl" />
        <span>Signout</span>
      </button>
    </nav>
  );
}
