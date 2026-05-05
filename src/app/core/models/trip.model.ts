export interface Trip {
  id: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  seats: number;
  seatsAvailable: number;
  driver: Driver;
  rating: number;
}

export interface Driver {
  id: string;
  name: string;
  initials: string;
  avatar?: string;
  rating: number;
  trips: number;
  verified: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'passenger' | 'driver' | 'both';
  token?: string;
}

export interface SearchParams {
  origin: string;
  destination: string;
  date: string;
  passengers: number;
}
