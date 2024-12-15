import React from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { ItineraryHeader } from '../components/itinerary/ItineraryHeader';
import { PinCard } from '../components/itinerary/PinCard';
import { CommentSection } from '../components/comments/CommentSection';

// Mock data - replace with actual API call
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
  updatedAt: new Date('2024-03-22')
};

export const ItineraryDetailPage = () => {
  const { id } = useParams();

  const handleShare = () => {
    // Implement share functionality
    console.log('Share itinerary:', id);
  };

  const handleAddComment = (content: string) => {
    // Implement add comment functionality
    console.log('Add comment:', content);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} />
      
      <div className="pt-16">
        <ItineraryHeader 
          itinerary={mockItinerary}
          onShare={handleShare}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Pins List */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-semibold mb-6">Itinerary Stops</h2>
              {mockItinerary.pins.map((pin, index) => (
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
                comments={mockItinerary.comments}
                onAddComment={handleAddComment}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};