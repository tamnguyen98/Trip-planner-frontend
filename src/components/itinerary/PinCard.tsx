import React from 'react';
import { MapPin, Star } from 'lucide-react';
import type { Pin } from '../../types';

interface PinCardProps {
  pin: Pin;
  index: number;
}

export const PinCard: React.FC<PinCardProps> = ({ pin, index }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 flex gap-4">
    <div className="w-24 h-24 flex-shrink-0">
      {pin.images[0] ? (
        <img
          src={pin.images[0]}
          alt={pin.name}
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
          <MapPin className="h-8 w-8 text-gray-400" />
        </div>
      )}
    </div>
    
    <div className="flex-1">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-sm font-medium text-gray-500">Stop {index + 1}</span>
          <h3 className="text-lg font-semibold">{pin.name}</h3>
        </div>
        {pin.rating > 0 && (
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">{pin.rating}</span>
          </div>
        )}
      </div>
      
      <p className="text-gray-600 text-sm mt-1">{pin.description}</p>
      
      <div className="mt-2 text-sm text-gray-500">
        {pin.location.city}, {pin.location.country}
      </div>
    </div>
  </div>
);