import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { PersonalItineraryTileCard } from '../components/itinerary/PersonalItineraryTileCard';

export const HomePage = () => {
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/itinerary/${id}/edit`);
  };

  const handleView = (id: string) => {
    navigate(`/itinerary/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
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
          <button 
            onClick={() => navigate('/itinerary/new')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create New
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <PersonalItineraryTileCard 
              key={i}
              onClick={() => handleView(i.toString())}
              onEdit={() => handleEdit(i.toString())}
              onShare={() => console.log('Share itinerary', i)}
              onDelete={() => console.log('Delete itinerary', i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};