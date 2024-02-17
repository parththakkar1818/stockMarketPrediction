import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-cyan-500">
      <div className="max-w-screen-xl flex items-center mx-2 p-4">
        <img src="/logo.png" alt="Logo" className="h-17 w-16 rounded-full" />
        {/* <p className="text-white font-semibold text-2xl ml-5 hover:underline hover:underline-offset-[8px] hover:cursor-pointer">Home</p> */}
        <Link
          to="/"
          className="text-white font-semibold text-2xl ml-5 hover:underline hover:underline-offset-[8px] hover:cursor-pointer"
        >
          Home
        </Link>
        <Link
          to="/news"
          className="text-white font-semibold text-2xl ml-5 hover:underline hover:underline-offset-[8px] hover:cursor-pointer"
        >
          News
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;