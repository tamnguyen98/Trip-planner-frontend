import React from 'react';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { MapPin, Calendar, Clock } from 'lucide-react';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} />
      
      {/* Search Section */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Where to next?</h1>
          <SearchBar />
        </div>
      </div>

      {/* My Itineraries */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Itineraries</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Create New
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <ItineraryCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ItineraryCard = () => (
  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-lg font-semibold">Tokyo Adventure</h3>
      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Public</span>
    </div>
    
    <div className="space-y-3 text-sm text-gray-600">
      <div className="flex items-center">
        <MapPin className="h-4 w-4 mr-2" />
        <span>Tokyo → Kyoto</span>
      </div>
      <div className="flex items-center">
        <Calendar className="h-4 w-4 mr-2" />
        <span>Mar 15 - Mar 22, 2024</span>
      </div>
      <div className="flex items-center">
        <Clock className="h-4 w-4 mr-2" />
        <span>8 days • 12 pins</span>
      </div>
    </div>
    
    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
      <div className="flex space-x-2">
        <button className="text-sm text-blue-600 hover:text-blue-700">Edit</button>
        <button className="text-sm text-blue-600 hover:text-blue-700">Share</button>
      </div>
      <button className="text-sm text-red-600 hover:text-red-700">Delete</button>
    </div>
  </div>
);