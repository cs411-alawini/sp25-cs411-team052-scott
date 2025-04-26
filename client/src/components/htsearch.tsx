import React, { useState } from "react";

interface AirportSearchProps {
  onSearch: (airport: string) => void;
}

const HTSearch: React.FC<AirportSearchProps> = ({ onSearch }) => {
  const [airport, setAirport] = useState("");

  const handleSearch = () => {
     onSearch(airport);
   };

  return (
    <div className="flex flex-col space-y-4 w-full max-w-lg">
      <div className="flex space-x-4">
        <div className="w-full relative">
          <input
            type="text"
            placeholder="Airport"
            value={airport}
            onChange={(e) => setAirport(e.target.value)}
            className="w-full py-2 pl-3 pr-4 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
      <button
        onClick={handleSearch}
        className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
      >
        Search
      </button>
    </div>
  );
};

export default HTSearch;
