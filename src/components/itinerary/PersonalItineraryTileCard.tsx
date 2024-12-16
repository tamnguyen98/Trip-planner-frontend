import React from 'react';
import { MapPin, Calendar, Clock } from 'lucide-react';

interface PersonalItineraryTileCardProps {
  title?: string;
  fromTo?: string;
  dates?: string;
  pinCount?: number;
  visibility?: 'private' | 'public' | 'listed';
  onClick?: () => void;
  onEdit?: () => void;
  onShare?: () => void;
  onDelete?: () => void;
}

export const PersonalItineraryTileCard: React.FC<PersonalItineraryTileCardProps> = ({
  title = 'Tokyo Adventure',
  fromTo = 'Tokyo → Kyoto',
  dates = 'Mar 15 - Mar 22, 2024',
  pinCount = 12,
  visibility = 'public',
  onClick,
  onEdit,
  onShare,
  onDelete
}) => (
  <div 
    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer"
    onClick={(e) => {
      e.stopPropagation();
      onClick?.();
    }}
  >
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
        {visibility}
      </span>
    </div>
    
    <div className="space-y-3 text-sm text-gray-600">
      <div className="flex items-center">
        <MapPin className="h-4 w-4 mr-2" />
        <span>{fromTo}</span>
      </div>
      <div className="flex items-center">
        <Calendar className="h-4 w-4 mr-2" />
        <span>{dates}</span>
      </div>
      <div className="flex items-center">
        <Clock className="h-4 w-4 mr-2" />
        <span>8 days • {pinCount} pins</span>
      </div>
    </div>
    
    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
      <div className="flex space-x-2">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.();
          }}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Edit
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onShare?.();
          }}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Share
        </button>
      </div>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onDelete?.();
        }}
        className="text-sm text-red-600 hover:text-red-700"
      >
        Delete
      </button>
    </div>
  </div>
);