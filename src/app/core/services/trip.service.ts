import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Trip, SearchParams } from '../models/trip.model';
import { environment } from '../../../environments/environment';

const MOCK_TRIPS: Trip[] = [
  {
    id: '1', origin: 'Bogotá', destination: 'Medellín',
    date: 'Hoy', time: '7:00 AM', duration: '8h aprox.',
    price: 45000, seats: 4, seatsAvailable: 1,
    driver: { id: 'd1', name: 'Carlos A.', initials: 'CA', rating: 4.9, trips: 127, verified: true },
    rating: 4.9
  },
  {
    id: '2', origin: 'Bogotá', destination: 'Cali',
    date: 'Mañana', time: '6:00 AM', duration: '9h aprox.',
    price: 55000, seats: 4, seatsAvailable: 2,
    driver: { id: 'd2', name: 'María R.', initials: 'MR', rating: 4.7, trips: 89, verified: true },
    rating: 4.7
  },
  {
    id: '3', origin: 'Medellín', destination: 'Cartagena',
    date: '16 Jun', time: '5:30 AM', duration: '13h aprox.',
    price: 80000, seats: 4, seatsAvailable: 3,
    driver: { id: 'd3', name: 'Luis P.', initials: 'LP', rating: 4.8, trips: 204, verified: true },
    rating: 4.8
  },
  {
    id: '4', origin: 'Bogotá', destination: 'Bucaramanga',
    date: '17 Jun', time: '8:00 AM', duration: '7h aprox.',
    price: 40000, seats: 3, seatsAvailable: 2,
    driver: { id: 'd4', name: 'Ana G.', initials: 'AG', rating: 4.6, trips: 56, verified: true },
    rating: 4.6
  },
  {
    id: '5', origin: 'Cali', destination: 'Pasto',
    date: '18 Jun', time: '6:30 AM', duration: '5h aprox.',
    price: 30000, seats: 4, seatsAvailable: 1,
    driver: { id: 'd5', name: 'Pedro M.', initials: 'PM', rating: 4.9, trips: 341, verified: true },
    rating: 4.9
  },
  {
    id: '6', origin: 'Medellín', destination: 'Bogotá',
    date: '19 Jun', time: '9:00 AM', duration: '8h aprox.',
    price: 45000, seats: 4, seatsAvailable: 4,
    driver: { id: 'd6', name: 'Sandra V.', initials: 'SV', rating: 4.5, trips: 72, verified: false },
    rating: 4.5
  }
];

@Injectable({ providedIn: 'root' })
export class TripService {
  constructor(private http: HttpClient) {}

  getFeaturedTrips(): Observable<Trip[]> {
    // Mock — replace with: this.http.get<Trip[]>(`${environment.apiUrl}/trips/featured`)
    return of(MOCK_TRIPS.slice(0, 3));
  }

  searchTrips(params: SearchParams): Observable<Trip[]> {
    // Mock — replace with: this.http.get<Trip[]>(`${environment.apiUrl}/trips`, { params: { ...params } })
    const filtered = MOCK_TRIPS.filter(t =>
      (!params.origin || t.origin.toLowerCase().includes(params.origin.toLowerCase())) &&
      (!params.destination || t.destination.toLowerCase().includes(params.destination.toLowerCase()))
    );
    return of(filtered);
  }

  getTripById(id: string): Observable<Trip | undefined> {
    return of(MOCK_TRIPS.find(t => t.id === id));
  }
}
