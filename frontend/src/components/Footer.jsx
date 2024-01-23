import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="flex justify-center bg-cyan-500 bottom-0 fixed w-full">
      <div>
        <a
              href="https://www.linkedin.com/in/parth-thakkar-5b4946230/"
              target="_blank"
              rel="noopener noreferrer"
              className=""
        >
        <p className="flex items-center p-2">
          
            <FaLinkedinIn size={20} className="flex mx-2"/>Made by<b className="ml-1 font-sans">Parth Thakkar</b>😎

          
        </p>
        </a>
      </div>
    </footer>
  );
};

export default Footer;


{/* <p>
            Made by{" "}
            <a
              href="https://www.linkedin.com/in/parth-thakkar-5b4946230/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:underline"
            >
              Parth Thakkar
            </a>
          </p> */}