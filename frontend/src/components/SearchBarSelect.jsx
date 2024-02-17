import React, { useState, useEffect } from 'react';
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const SearchableSelect = ({ options, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options.slice(0, 10)); // Initially show the first 10 options
  // const [selectedOption, setSelectedOption] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Filter options based on search term
    const filtered = options.filter(option =>
      option.name.toLowerCase().includes(searchTerm.toLowerCase())
    )// Limit to the first 10 filtered options
    setFilteredOptions(filtered);
  }, [searchTerm, options]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOptionClick = (option) => {
    // setSelectedOption(option);
    setIsDropdownOpen(false);
    onSelect(option);
    setSearchTerm(option.name)
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-bold text-gray-700" htmlFor="selectStock">
        Select Stock:
      </label>
      <div className="searchable-select relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onClick={handleToggleDropdown}
          placeholder="Type to search..."
          className="py-2.5 px-4 pr-10 rounded-md border-2 border-blue-700 focus:outline-none focus:border-blue-500 transition-all duration-300"
          
        />
        {isDropdownOpen && (
          <ul className="dropdown-list max-h-40 overflow-y-auto absolute z-10 bg-white border border-gray-300 rounded-md">
            {filteredOptions.map((option, index) => (
              <li 
                className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                key={index} 
                onClick={() => handleOptionClick(option)}
              >
                {option.name} ({option.symbol})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const GetDataButton = ({ onClick }) => {
  return (
    <button 
      className="bg-cyan-500 text-white mt-[27px] mb-auto p-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 " 
      // className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" 
      onClick={onClick}
    >
      Get Data
    </button>
  );
};

export { SearchableSelect, GetDataButton };
