import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NotificationService, NotificationItem } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, MatListModule, MatButtonModule, MatIconModule],
  template: `
    <div class="rg-notification-shell">
      <header class="rg-notification-header">
        <div>
          <h2>Notificaciones</h2>
          <p>Recibe actualizaciones de tus viajes y alertas importantes.</p>
        </div>
        <button mat-flat-button color="primary" (click)="markAllAsRead()">
          <mat-icon>done_all</mat-icon>
          Marcar todas como leídas
        </button>
      </header>

      <mat-list>
        <mat-list-item *ngFor="let notification of notifications">
          <div matLine class="rg-notification-title">{{ notification.title }}</div>
          <div matLine class="rg-notification-body">{{ notification.body }}</div>
          <mat-icon matListIcon color="primary">{{ notification.read ? 'notifications' : 'notification_important' }}</mat-icon>
        </mat-list-item>
      </mat-list>

      <div *ngIf="notifications.length === 0" class="rg-notification-empty">
        <p>No hay notificaciones nuevas.</p>
      </div>
    </div>
  `,
  styles: [
    `.rg-notification-shell { padding: 1.5rem; max-width: 900px; margin: 0 auto; }
     .rg-notification-header { display: flex; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
     .rg-notification-header h2 { margin: 0; }
     .rg-notification-title { font-weight: 700; }
     .rg-notification-body { color: #606060; }
     .rg-notification-empty { text-align: center; padding: 2rem; color: #888; }
     @media (max-width: 720px) { .rg-notification-header { flex-direction: column; align-items: stretch; } }
    `
  ]
})
export class NotificationComponent implements OnInit {
  private notificationService = inject(NotificationService);

  notifications: NotificationItem[] = [];

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe({
      next: items => this.notifications = items,
      error: () => this.notifications = []
    });
  }

  markAllAsRead(): void {
    this.notificationService.markAllAsRead().subscribe({
      next: () => this.notifications = this.notifications.map(note => ({ ...note, read: true }))
    });
  }
}
