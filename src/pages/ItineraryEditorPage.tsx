import React, { useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { ItineraryForm } from '../components/itinerary/ItineraryForm';
import { PinsList } from '../components/itinerary/PinsList';
import type { Itinerary, Pin } from '../types';

export const ItineraryEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [itinerary, setItinerary] = useState<Partial<Itinerary>>({
    title: '',
    visibility: 'private',
    fromLocation: { city: '', country: '' },
    toLocation: { city: '', country: '' },
    pins: [],
    travelType: 'air'
  });

  const handlePinsChange = useCallback((pins: Pin[]) => {
    setItinerary(prev => ({ ...prev, pins }));
  }, []);

  const handleSave = async () => {
    // try {
    //   const url = isEditMode 
    //     ? `http://localhost:3000/api/itineraries/${id}`
    //     : 'http://localhost:3000/api/itineraries';
      
    //   const response = await fetch(url, {
    //     method: isEditMode ? 'PUT' : 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(itinerary)
    //   });
      
    //   if (response.ok) {
    //     navigate('/home');
    //   }
    // } catch (error) {
    //   console.error('Failed to save itinerary:', error);
    // }

    // debug
    console.log(itinerary);
  };

  const handleDelete = async () => {
    if (!isEditMode || !window.confirm('Are you sure you want to delete this itinerary?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/itineraries/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        navigate('/home');
      }
    } catch (error) {
      console.error('Failed to delete itinerary:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} />
      
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