import React from 'react';
import { Plane, Train, Ship } from 'lucide-react';

interface Props {
  value?: string;
  onChange: (type: string) => void;
}

const TRAVEL_TYPES = [
  { icon: Plane, label: 'Air' },
  { icon: Train, label: 'Land' },
  { icon: Ship, label: 'Sea' }
] as const;

// Function to return the icon based on the label
const getTravelIcon = (label: string) => {
  switch (label) {
    case 'Air':
      return Plane; // Returns the Plane icon
    case 'Land':
      return Train; // Returns the Train icon
    case 'Sea':
      return Ship; // Returns the Ship icon
    default:
      return null; // Fallback if label doesn't match
  }
};

export const ConvertTravelLabelToIcon = ({ label }: { label: string }) => {
  const Icon = getTravelIcon(label);

  return (
    <div>
      {Icon ? (
        <Icon className="h-6 w-6 text-blue-600" /> // Render the icon
      ) : (
        <span>No icon found</span> // Fallback for invalid label
      )}
    </div>
  );
};


export const TravelTypeSelector = ({ value, onChange }: Props) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Travel Type</label>
      <div className="flex space-x-4">
        {TRAVEL_TYPES.map(({ icon: Icon, label }) => (
          <button
            key={label}
            onClick={() => onChange(label.toLowerCase())}
            className={`flex items-center px-4 py-2 rounded-md ${
              value === label.toLowerCase()
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Icon className="h-5 w-5 mr-2" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};