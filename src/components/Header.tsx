import React from 'react';
import { Menu, Search, User, Plane } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header = ({ isLoggedIn = false }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Plane className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-blue-600">TravelGuide</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            {isLoggedIn ? (
              <>
                <Link to="/create" className="text-gray-700 hover:text-blue-600">Create Itinerary</Link>
                <Link to="/explore" className="text-gray-700 hover:text-blue-600">Explore</Link>
                <Link to="/profile" className="p-2 rounded-full hover:bg-gray-100">
                  <User className="h-6 w-6" />
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
                <Link to="/signup" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
                  Sign Up
                </Link>
              </>
            )}
          </div>
          
          <button className="md:hidden p-2 rounded-md hover:bg-gray-100">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}