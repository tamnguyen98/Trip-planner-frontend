import { useState, useCallback } from 'react';
import { ItineraryService } from '../services/api';
import type { Itinerary } from '../types';
import type { SearchParams } from '../services/api/types';

export const useSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Itinerary[]>([]);
  const itineraryService = new ItineraryService();

  const searchItineraries = useCallback(async (params: SearchParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await itineraryService.searchItineraries(params);
      setResults(response.data);
      return response.data;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    results,
    searchItineraries,
  };
};