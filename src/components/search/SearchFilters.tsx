import React from 'react';

interface SearchFiltersProps {
  onSortChange?: (value: string) => void;
  onDurationChange?: (value: string) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  onSortChange,
  onDurationChange
}) => (
  <div className="flex gap-4 mb-6">
    <select 
      onChange={(e) => onSortChange?.(e.target.value)}
      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
    >
      <option value="popular">Sort by: Popular</option>
      <option value="newest">Newest</option>
      <option value="rated">Most Rated</option>
    </select>
    <select
      onChange={(e) => onDurationChange?.(e.target.value)}
      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
    >
      <option value="any">Duration: Any</option>
      <option value="1-3">1-3 days</option>
      <option value="4-7">4-7 days</option>
      <option value="8+">8+ days</option>
    </select>
  </div>
);