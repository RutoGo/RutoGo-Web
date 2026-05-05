import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then(m => m.authRoutes)
  },
  {
    path: 'viajes',
    loadComponent: () =>
      import('./features/trips/trips.component').then(m => m.TripsComponent)
  },
  {
    path: 'viajes/lista',
    loadComponent: () =>
      import('./features/trip-list/trip-list.component').then(m => m.TripListComponent)
  },
  {
    path: 'notificaciones',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/notification/notification.component').then(m => m.NotificationComponent)
  },
  {
    path: 'chat/:tripId',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/chat/chat.component').then(m => m.ChatComponent)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
