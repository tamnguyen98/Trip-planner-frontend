import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { ItineraryHeader } from '../components/itinerary/ItineraryHeader';
import { PinCard } from '../components/itinerary/PinCard';
import { CommentSection } from '../components/comments/CommentSection';
import { useItinerary } from '../hooks/useItinerary';
import type { Itinerary } from '../types';

// Mock data for development - remove when API is ready
const mockItinerary = {
  id: '1',
  title: 'Tokyo Adventure',
  author: { id: '1', name: 'John Doe', email: 'john@example.com' },
  fromLocation: { city: 'Tokyo', country: 'Japan' },
  toLocation: { city: 'Kyoto', country: 'Japan' },
  pins: [
    {
      id: '1',
      name: 'Sensō-ji Temple',
      description: 'Ancient Buddhist temple in Asakusa',
      location: { city: 'Tokyo', country: 'Japan' },
      images: ['https://images.unsplash.com/photo-1545569341-9eb8b30979d9'],
      rating: 4.8
    },
    {
      id: '2',
      name: 'Fushimi Inari Shrine',
      description: 'Famous shrine with thousands of torii gates',
      location: { city: 'Kyoto', country: 'Japan' },
      images: ['https://images.unsplash.com/photo-1478436127897-769e1b3f0f36'],
      rating: 4.9
    }
  ],
  visibility: 'public' as const,
  sharedWith: [],
  rating: 4.8,
  comments: [
    {
      id: '1',
      author: { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
      content: 'Great itinerary! I followed this on my last trip and it was perfect.',
      createdAt: new Date('2024-03-01')
    }
  ],
  createdAt: new Date('2024-03-15'),
  endDate: new Date('2024-03-22'),
  startDate: new Date('2024-03-15'),
  updatedAt: new Date('2024-03-22'),
  travelType: 'Air'
};

export const ItineraryDetailPage = () => {
  const { id } = useParams();
  const { 
    getItinerary, 
    addComment, 
    rateItinerary, 
    updateVisibility,
    loading, 
    error 
  } = useItinerary();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);

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

  const handleAddComment = async (content: string) => {
    if (!id) return;

    // POST /api/itineraries/:id/comments
    // Required: JWT token in Authorization header
    // Body: { content: string }
    const comment = await addComment(id, content);
    if (comment && itinerary) {
      setItinerary({
        ...itinerary,
        comments: [...itinerary.comments, comment]
      });
    }
  };

  const handleRating = async (rating: number) => {
    if (!id) return;

    // POST /api/itineraries/:id/rate
    // Required: JWT token in Authorization header
    // Body: { rating: number }
    await rateItinerary(id, rating);
    if (itinerary) {
      setItinerary({
        ...itinerary,
        rating
      });
    }
  };

  const handleVisibilityChange = async (visibility: 'private' | 'public' | 'listed') => {
    if (!id) return;

    // PUT /api/itineraries/:id/visibility
    // Required: JWT token in Authorization header
    // Body: { visibility: 'private' | 'public' | 'listed' }
    await updateVisibility(id, visibility);
    if (itinerary) {
      setItinerary({
        ...itinerary,
        visibility
      });
    }
  };

  // Loading and error states remain the same

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-16">
        <ItineraryHeader 
          itinerary={itinerary!} 
          onVisibilityChange={handleVisibilityChange}
          onRate={handleRating}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            {itinerary?.pins.map((pin, index) => (
              <PinCard key={pin.id} pin={pin} index={index} />
            ))}
          </div>

          <div className="mt-12">
            <CommentSection
              comments={itinerary?.comments || []}
              onAddComment={handleAddComment}
            />
          </div>
        </div>
      </div>
    </div>
  );
};