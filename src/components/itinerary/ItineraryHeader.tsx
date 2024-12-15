import React from 'react';
import { MapPin, Calendar, Clock, User, Share2, Star } from 'lucide-react';
import type { Itinerary } from '../../types';

interface ItineraryHeaderProps {
  itinerary: Itinerary;
  onShare?: () => void;
}

export const ItineraryHeader: React.FC<ItineraryHeaderProps> = ({ itinerary, onShare }) => {
  const duration = Math.ceil((new Date(itinerary.updatedAt).getTime() - 
    new Date(itinerary.createdAt).getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{itinerary.title}</h1>
              <span className={`px-2 py-1 text-xs rounded-full ${
                itinerary.visibility === 'public' 
                  ? 'bg-green-100 text-green-800'
                  : itinerary.visibility === 'listed'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
              }`}>
                {itinerary.visibility}
              </span>
            </div>

            <div className="flex items-center gap-6 text-gray-600">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>by {itinerary.author.name}</span>
              </div>
              {itinerary.rating > 0 && (
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span>{itinerary.rating}</span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={onShare}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="flex items-center text-gray-600">
            <MapPin className="h-5 w-5 mr-3" />
            <div>
              <div className="font-medium">Route</div>
              <div>{itinerary.fromLocation.city} → {itinerary.toLocation.city}</div>
            </div>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Calendar className="h-5 w-5 mr-3" />
            <div>
              <div className="font-medium">Dates</div>
              <div>{new Date(itinerary.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Clock className="h-5 w-5 mr-3" />
            <div>
              <div className="font-medium">Duration</div>
              <div>{duration} days • {itinerary.pins.length} pins</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};