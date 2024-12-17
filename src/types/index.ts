export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Location {
  city: string;
  country: string;
}

export interface Pin {
  id: string;
  name: string;
  description: string;
  location: Location;
  images: string[];
  rating: number;
}

export interface Itinerary {
  id: string;
  title: string;
  author: User;
  fromLocation: Location;
  toLocation: Location;
  startDate: Date | undefined;
  endDate: Date | undefined;
  pins: Pin[];
  visibility: 'private' | 'public' | 'listed';
  sharedWith: string[];
  rating: number;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
  travelType: string | undefined;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: Date;
}