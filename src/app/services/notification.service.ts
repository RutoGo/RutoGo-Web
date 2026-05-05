import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
  type?: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private http: HttpClient) {}

  getNotifications(): Observable<NotificationItem[]> {
    return this.http.get<NotificationItem[]>(`${environment.API_BASE_URL}/notifications`);
  }

  getUnreadCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${environment.API_BASE_URL}/notifications/unread-count`);
  }

  markAllAsRead(): Observable<void> {
    return this.http.patch<void>(`${environment.API_BASE_URL}/notifications/read-all`, {});
  }
}
