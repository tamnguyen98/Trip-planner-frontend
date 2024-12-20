import { useState, useCallback } from 'react';
import { ItineraryService } from '../services/api';
import type { Itinerary, Comment } from '../types';
import type { CreateItineraryDTO, UpdateItineraryDTO } from '../services/api/types';

export const useItinerary = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const itineraryService = new ItineraryService();

  const handleError = (error: unknown) => {
    setError(error instanceof Error ? error.message : 'An error occurred');
    setLoading(false);
  };

  const getItinerary = useCallback(async (id: string): Promise<Itinerary | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await itineraryService.getItinerary(id);
      return response.data;
    } catch (error) {
      handleError(error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createItinerary = useCallback(async (data: CreateItineraryDTO): Promise<Itinerary | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await itineraryService.createItinerary(data);
      return response.data;
    } catch (error) {
      handleError(error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateItinerary = useCallback(async (data: UpdateItineraryDTO): Promise<Itinerary | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await itineraryService.updateItinerary(data);
      return response.data;
    } catch (error) {
      handleError(error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteItinerary = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await itineraryService.deleteItinerary(id);
      return true;
    } catch (error) {
      handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const shareItinerary = useCallback(async (
    itineraryId: string,
    userEmails: string[],
    accessLevel: 'view' | 'edit'
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await itineraryService.shareItinerary({ itineraryId, userEmails, accessLevel });
      return true;
    } catch (error) {
      handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const addComment = useCallback(async (
    itineraryId: string,
    content: string
  ): Promise<Comment | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await itineraryService.addComment({ itineraryId, content });
      return response.data;
    } catch (error) {
      handleError(error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const rateItinerary = useCallback(async (itineraryId: string, rating: number): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await itineraryService.rateItinerary(itineraryId, rating); // Pass arguments directly
      return true;
    } catch (error) {
      handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);
  

  const updateVisibility = useCallback(async (
    itineraryId: string,
    visibility: 'private' | 'public' | 'listed'
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await itineraryService.updateVisibility(itineraryId, visibility); // Pass arguments directly
      return true;
    } catch (error) {
      handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);
  

  return {
    loading,
    error,
    getItinerary,
    createItinerary,
    updateItinerary,
    deleteItinerary,
    shareItinerary,
    addComment,
    rateItinerary, 
    updateVisibility,
  };
};