import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { SearchFilters } from '../components/search/SearchFilters';
import { ItineraryTileCard } from '../components/search/ItineraryTileCard';

export const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  const [sortBy, setSortBy] = useState('popular');
  const [duration, setDuration] = useState('any');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Search Bar Section */}
      <div className="sticky top-0 z-40 bg-white shadow-sm"  style={{ paddingTop: '64px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <SearchBar />
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Itineraries from {from} to {to}
          </h1>
          <p className="text-gray-600 mt-2">Found 15 itineraries</p>
        </div>

        <SearchFilters 
          onSortChange={setSortBy}
          onDurationChange={setDuration}
        />

        {/* Results Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ItineraryTileCard
              key={i}
              onClick={() => navigate(`/itinerary/${i}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};