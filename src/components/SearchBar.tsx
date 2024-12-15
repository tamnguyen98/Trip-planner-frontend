import React from 'react';
import { Search } from 'lucide-react';

export const SearchBar = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">From</label>
        <div className="mt-1 relative">
          <input
            type="text"
            className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Departure city"
          />
        </div>
      </div>
      
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">To</label>
        <div className="mt-1 relative">
          <input
            type="text"
            className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Destination city"
          />
        </div>
      </div>
      
      <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center">
        <Search className="h-5 w-5 mr-2" />
        Search
      </button>
    </div>
  );
}