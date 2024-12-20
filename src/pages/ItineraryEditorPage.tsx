import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { ItineraryForm } from '../components/itinerary/ItineraryForm';
import { PinsList } from '../components/itinerary/PinsList';
import { useItinerary } from '../hooks/useItinerary';
import type { Itinerary, Pin } from '../types';
import type { CreateItineraryDTO } from '../services/api/types';

export const ItineraryEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const { getItinerary, createItinerary, updateItinerary, deleteItinerary, loading, error } = useItinerary();

  const [itinerary, setItinerary] = useState<Partial<Itinerary>>({
    title: '',
    visibility: 'private',
    fromLocation: { city: '', country: '' },
    toLocation: { city: '', country: '' },
    pins: [],
    travelType: 'air'
  });

  useEffect(() => {
    const fetchItinerary = async () => {
      if (id) {
        const response = await getItinerary(id);
        if (response) {
          setItinerary(response);
        }
      }
    };

    fetchItinerary();
  }, [id, getItinerary]);

  const handlePinsChange = useCallback((pins: Pin[]) => {
    setItinerary(prev => ({ ...prev, pins }));
  }, []);

  const validateItinerary = (data: Partial<Itinerary>): data is CreateItineraryDTO => {
    return !!(
      data.title &&
      data.fromLocation?.city &&
      data.fromLocation?.country &&
      data.toLocation?.city &&
      data.toLocation?.country &&
      data.visibility &&
      data.travelType &&
      Array.isArray(data.pins)
    );
  };

  const handleSave = async () => {
    try {
      if (!validateItinerary(itinerary)) {
        throw new Error('Please fill in all required fields');
      }

      if (isEditMode && id) {
        await updateItinerary({ ...itinerary, id });
      } else {
        await createItinerary(itinerary);
      }
      navigate('/home');
    } catch (error) {
      console.error('Failed to save itinerary:', error);
      // Here you might want to show an error message to the user
    }
  };

  const handleDelete = async () => {
    if (!isEditMode || !id || !window.confirm('Are you sure you want to delete this itinerary?')) {
      return;
    }

    try {
      await deleteItinerary(id);
      navigate('/home');
    } catch (error) {
      console.error('Failed to delete itinerary:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-24 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditMode ? 'Edit Itinerary' : 'Create New Itinerary'}
            </h1>
            <div className="space-x-4">
              <button
                onClick={() => navigate('/home')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                type="button"
              >
                Cancel
              </button>
              {isEditMode && (
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 border border-red-300 rounded-md text-red-700 hover:bg-red-50"
                  type="button"
                >
                  Delete
                </button>
              )}
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                type="button"
              >
                Save
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <ItineraryForm
              itinerary={itinerary}
              onChange={setItinerary}
            />
            <PinsList
              pins={itinerary.pins || []}
              onChange={handlePinsChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};