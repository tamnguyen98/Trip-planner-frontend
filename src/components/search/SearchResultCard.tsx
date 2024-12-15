import React from 'react';
import { MapPin, Star, User, Clock } from 'lucide-react';

interface SearchResultCardProps {
  title?: string;
  rating?: number;
  fromTo?: string;
  pinCount?: number;
  duration?: string;
  author?: string;
  imageUrl?: string;
  onClick?: () => void;
}

export const SearchResultCard: React.FC<SearchResultCardProps> = ({
  title = 'Tokyo Explorer',
  rating = 4.8,
  fromTo = 'Tokyo → Kyoto',
  pinCount = 12,
  duration = '7 days',
  author = 'John Doe',
  imageUrl = 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b',
  onClick
}) => (
  <div 
    onClick={onClick}
    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group cursor-pointer"
  >
    <div className="relative">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium">
        {duration}
      </div>
    </div>

    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm text-gray-600">{rating}</span>
        </div>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{fromTo}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-2" />
          <span>{pinCount} Pins</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center">
          <User className="h-4 w-4 text-gray-400 mr-1" />
          <span className="text-sm text-gray-600">{author}</span>
        </div>
        <span className="text-sm text-blue-600">View Details →</span>
      </div>
    </div>
  </div>
);