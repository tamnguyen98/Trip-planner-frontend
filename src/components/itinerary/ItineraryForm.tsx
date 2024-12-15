import React from 'react';
import type { Itinerary } from '../../types';
import { TravelTypeSelector } from './TravelTypeSelector';

interface Props {
  itinerary: Partial<Itinerary>;
  onChange: (itinerary: Partial<Itinerary>) => void;
}

export const ItineraryForm = ({ itinerary, onChange }: Props) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Itinerary Name</label>
          <input
            type="text"
            value={itinerary.title || ''}
            onChange={(e) => onChange({ ...itinerary, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter itinerary name"
          />
        </div>

        {/* Locations */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">From</label>
            <input
              type="text"
              value={itinerary.fromLocation?.city || ''}
              onChange={(e) => onChange({
                ...itinerary,
                fromLocation: { ...itinerary.fromLocation, city: e.target.value }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Departure city"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">To</label>
            <input
              type="text"
              value={itinerary.toLocation?.city || ''}
              onChange={(e) => onChange({
                ...itinerary,
                toLocation: { ...itinerary.toLocation, city: e.target.value }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Destination city"
            />
          </div>
        </div>

        {/* Travel Type */}
        <TravelTypeSelector
          value={itinerary.travelType}
          onChange={(type) => onChange({ ...itinerary, travelType: type })}
        />

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              value={itinerary.startDate || ''}
              onChange={(e) => onChange({ ...itinerary, startDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              value={itinerary.endDate || ''}
              onChange={(e) => onChange({ ...itinerary, endDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Visibility */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Visibility</label>
          <select
            value={itinerary.visibility || 'private'}
            onChange={(e) => onChange({ ...itinerary, visibility: e.target.value as any })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
            <option value="listed">Listed</option>
          </select>
        </div>
      </div>
    </div>
  );
};