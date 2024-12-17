import { HttpClient } from './HttpClient';
import type {
  ApiResponse,
  SearchParams,
  CreateItineraryDTO,
  UpdateItineraryDTO,
  ShareItineraryDTO,
  AddCommentDTO,
} from './types';
import type { Itinerary, Comment } from '../../types';

export class ItineraryService {
  private http: HttpClient;

  constructor() {
    this.http = new HttpClient();
  }

  // Search itineraries
  async searchItineraries(params: SearchParams): Promise<ApiResponse<Itinerary[]>> {
    return this.http.get<ApiResponse<Itinerary[]>>('/itineraries/search', params as Record<string, string>);
  }

  // Get single itinerary
  async getItinerary(id: string): Promise<ApiResponse<Itinerary>> {
    return this.http.get<ApiResponse<Itinerary>>(`/itineraries/${id}`);
  }

  // Create new itinerary
  async createItinerary(data: CreateItineraryDTO): Promise<ApiResponse<Itinerary>> {
    return this.http.post<ApiResponse<Itinerary>>('/itineraries', data);
  }

  // Update existing itinerary
  async updateItinerary(data: UpdateItineraryDTO): Promise<ApiResponse<Itinerary>> {
    return this.http.put<ApiResponse<Itinerary>>(`/itineraries/${data.id}`, data);
  }

  // Delete itinerary
  async deleteItinerary(id: string): Promise<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`/itineraries/${id}`);
  }

  // Share itinerary
  async shareItinerary(data: ShareItineraryDTO): Promise<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`/itineraries/${data.itineraryId}/share`, data);
  }

  // Add comment to itinerary
  async addComment(data: AddCommentDTO): Promise<ApiResponse<Comment>> {
    return this.http.post<ApiResponse<Comment>>(`/itineraries/${data.itineraryId}/comments`, data);
  }

  // Update itinerary visibility
  async updateVisibility(
    id: string,
    visibility: 'private' | 'public' | 'listed'
  ): Promise<ApiResponse<void>> {
    return this.http.put<ApiResponse<void>>(`/itineraries/${id}/visibility`, { visibility });
  }

  // Rate itinerary
  async rateItinerary(id: string, rating: number): Promise<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`/itineraries/${id}/rate`, { rating });
  }
}