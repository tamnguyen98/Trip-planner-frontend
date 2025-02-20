import React from 'react';
import { Header } from '../components/Header';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { SearchBar } from '../components/SearchBar';
import { Globe2, Map, Share2, Star } from 'lucide-react';
import { ItineraryTileCard } from '../components/search/ItineraryTileCard';


interface FeatureCardProps {
  icon: React.ReactNode; // `React.ReactNode` allows any valid JSX (e.g., an icon)
  title: string;         // `title` is a string
  description: string;   // `description` is a string
}


export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Discover Your Perfect Journey
          </h1>
          <p className="text-xl text-white/90 mb-12">
            Plan, share, and explore incredible travel itineraries created by travelers like you
          </p>
          <div className="flex justify-center items-center min-v-screen">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Map className="h-8 w-8 text-blue-600" />}
              title="Create Itineraries"
              description="Plan your perfect trip with custom itineraries and local attractions"
            />
            <FeatureCard
              icon={<Share2 className="h-8 w-8 text-blue-600" />}
              title="Share & Collaborate"
              description="Share your travel plans with friends and get their input"
            />
            <FeatureCard
              icon={<Globe2 className="h-8 w-8 text-blue-600" />}
              title="Explore Destinations"
              description="Discover new places and get inspired by other travelers"
            />
          </div>
        </div>
      </div>

      {/* Featured Itineraries */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Itineraries</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
            <ItineraryTileCard
              key={i}
              onClick={() => navigate(`/itinerary/${i}`)}
            />
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);
