import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SearchParams, Trip } from '../core/models/trip.model';

@Injectable({ providedIn: 'root' })
export class TripService {
  constructor(private http: HttpClient) {}

  getTrips(params: Partial<SearchParams> = {}): Observable<Trip[]> {
    let httpParams = new HttpParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    });

    return this.http.get<Trip[]>(`${environment.API_BASE_URL}/trips`, { params: httpParams });
  }

  getFeaturedTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${environment.API_BASE_URL}/trips/featured`);
  }

  getTripById(id: string): Observable<Trip> {
    return this.http.get<Trip>(`${environment.API_BASE_URL}/trips/${id}`);
  }

  createTrip(tripData: Partial<Trip>): Observable<Trip> {
    return this.http.post<Trip>(`${environment.API_BASE_URL}/trips`, tripData);
  }

  updateTrip(id: string, tripData: Partial<Trip>): Observable<Trip> {
    return this.http.put<Trip>(`${environment.API_BASE_URL}/trips/${id}`, tripData);
  }

  deleteTrip(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.API_BASE_URL}/trips/${id}`);
  }

  getMyTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${environment.API_BASE_URL}/trips/my/list`);
  }
}
