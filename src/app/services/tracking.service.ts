import { Injectable } from '@angular/core';
import { interval, map, Observable } from 'rxjs';

export interface TrackingUpdate {
  tripId: string;
  lat: number;
  lng: number;
  status: 'started' | 'on_route' | 'arrived';
  progress: number;
  updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class TrackingService {
  trackTrip(tripId: string): Observable<TrackingUpdate> {
    return interval(2000).pipe(
      map(index => ({
        tripId,
        lat: 4.6 + index * 0.008,
        lng: -74.0 + index * 0.01,
        status: index < 4 ? 'started' : index < 8 ? 'on_route' : 'arrived',
        progress: Math.min(100, (index + 1) * 12.5),
        updatedAt: new Date().toISOString()
      }))
    );
  }
}
