import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface BookingRequest {
  tripId: string;
  passengers: number;
  note?: string;
}

export interface BookingItem {
  id: string;
  tripId: string;
  userId: string;
  status: string;
  passengers: number;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private http: HttpClient) {}

  bookTrip(data: BookingRequest): Observable<BookingItem> {
    return this.http.post<BookingItem>(`${environment.API_BASE_URL}/bookings`, data);
  }

  getMyBookings(): Observable<BookingItem[]> {
    return this.http.get<BookingItem[]>(`${environment.API_BASE_URL}/bookings/my`);
  }

  cancelBooking(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.API_BASE_URL}/bookings/${id}`);
  }
}
