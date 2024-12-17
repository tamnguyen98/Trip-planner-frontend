import type { Itinerary, Pin, Comment } from '../../types';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface SearchParams {
  from?: string;
  to?: string;
  author?: string;
  sortBy?: 'popular' | 'newest' | 'rated';
  duration?: string;
  page?: number;
  limit?: number;
}

export interface CreateItineraryDTO {
  title: string;
  fromLocation: {
    city: string;
    country: string;
  };
  toLocation: {
    city: string;
    country: string;
  };
  visibility: 'private' | 'public' | 'listed';
  travelType: string;
  pins: Pin[];
}

export interface UpdateItineraryDTO extends Partial<CreateItineraryDTO> {
  id: string;
}

export interface ShareItineraryDTO {
  itineraryId: string;
  userEmails: string[];
  accessLevel: 'view' | 'edit';
}

export interface AddCommentDTO {
  itineraryId: string;
  content: string;
}