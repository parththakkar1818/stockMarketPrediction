import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-cyan-500">
      <div className="max-w-screen-xl flex items-center mx-2 p-4">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-17 w-16 rounded-full"
        />
        {/* <p className="text-white font-semibold text-2xl ml-5 hover:underline hover:underline-offset-[8px] hover:cursor-pointer">Home</p> */}
        <Link to="/" className="text-white font-semibold text-2xl ml-5 hover:underline hover:underline-offset-[8px] hover:cursor-pointer">
          Home
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;


{/* <div className="w-full md:w-auto">
          <ul className="text-2xl flex flex-col p-4 md:p-0 mt-1 border border-cyan-200 rounded-lg md:flex-row md:space-x-8">
            <li>
              <img
                src="/logo.png"
                alt="Logo"
                className="h-16 w-16 rounded-full"
              />
            </li>
            <li>
              <a
                href="/"
                className="block text-center my-4 px-2 text-white hover:border-b-2 hover:border-white transition duration-1000"
              >
                Home
              </a>
            </li>
          </ul>
        </div> */}