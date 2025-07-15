import React from "react";

const SideBar = () => {
  return (
    <div className="sidebar w-1/5 h-screen bg-gray-500 p-4 shadow-lg fixed top-16 left-0">
      <div className="flex flex-col h-full text-left">
        <ul className="flex flex-col space-y-4 mt-2 w-full ml-1 rounded-lg p-2 justify-items-center-safe justify-between items-stretch font-serif font-bold  italic ">
          <li className="text-center text-2xl text-green-400 list-none hover:bg-blue-600 hover:text-white transition-colors duration-300 block p-2">
            Home
          </li>
          <li className="text-center text-2xl text-green-400 list-none hover:bg-blue-600 hover:text-white transition-colors duration-300 block p-2 not-italic">
            Contact
          </li>
          <li className="text-center text-2xl text-green-400 list-none hover:bg-blue-600 hover:text-white transition-colors duration-300 block p-2">
            About
          </li>
          <li className="text-center text-2xl text-green-400 list-none hover:bg-blue-600 hover:text-white transition-colors duration-300 block p-2">
            Setting
          </li>
          
        </ul>
        
      </div>
    </div>
  );
};

export default SideBar;
