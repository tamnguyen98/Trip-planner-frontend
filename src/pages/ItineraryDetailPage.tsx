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
  const { loading: apiLoading, error, getItinerary, addComment, shareItinerary } = useItinerary();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItinerary = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        // For development, simulate API call with mock data
        // In production, uncomment the following line and remove the setTimeout
        // const data = await getItinerary(id);
        
        // Simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        setItinerary(mockItinerary);
      } catch (error) {
        console.error('Failed to fetch itinerary:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItinerary();
  }, [id, getItinerary]);

  const handleShare = async () => {
    if (!itinerary) return;

    const emails = window.prompt('Enter email addresses (comma-separated)')?.split(',').map(email => email.trim());
    if (!emails || emails.length === 0) return;

    const success = await shareItinerary(itinerary.id, emails, 'view');
    if (success) {
      alert('Itinerary shared successfully!');
    }
  };

  const handleAddComment = async (content: string) => {
    if (!itinerary) return;

    const newComment = await addComment(itinerary.id, content);
    if (newComment && itinerary) {
      setItinerary({
        ...itinerary,
        comments: [...itinerary.comments, newComment]
      });
    }
  };

  // Show loading state while fetching data
  if (loading || apiLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header isLoggedIn={true} />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading itinerary...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if there's an error
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header isLoggedIn={true} />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center text-red-600">
            <p className="text-xl">Error loading itinerary</p>
            <p className="mt-2">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Show not found state if no itinerary and not loading
  if (!itinerary && !loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header isLoggedIn={true} />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center text-gray-600">
            <p className="text-xl">Itinerary not found</p>
          </div>
        </div>
      </div>
    );
  }

  // Show itinerary content when data is available
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} />
      
      <div className="pt-16">
        <ItineraryHeader 
          itinerary={itinerary!}
          onShare={handleShare}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Pins List */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-semibold mb-6">Itinerary Stops</h2>
              {itinerary!.pins.map((pin, index) => (
                <PinCard 
                  key={pin.id}
                  pin={pin}
                  index={index}
                />
              ))}
            </div>

            {/* Comments Section */}
            <div className="lg:col-span-1">
              <CommentSection 
                comments={itinerary!.comments}
                onAddComment={handleAddComment}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};