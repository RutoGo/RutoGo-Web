import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TripService } from '../../../../core/services/trip.service';
import { Trip } from '../../../../core/models/trip.model';

@Component({
  selector: 'app-trips-preview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="rg-section">
      <div class="text-center">
        <div class="rg-section-tag">Rutas destacadas</div>
        <h2 class="rg-display rg-trips__title">
          Viajes <span class="rg-pink">disponibles</span> hoy
        </h2>
        <p class="rg-trips__sub">Encuentra tu próxima ruta entre cientos de opciones por Colombia</p>
      </div>

      <div class="rg-trips__grid">
        <div *ngFor="let trip of trips; let i = index" class="rg-trips__card">
          <div class="rg-trips__card-header">
            <div class="rg-trips__route">{{ trip.origin }} → {{ trip.destination }}</div>
            <div class="rg-trips__badge">{{ trip.rating }}★</div>
          </div>
          <div class="rg-trips__meta">{{ trip.date }} · {{ trip.time }} · {{ trip.duration }}</div>

          <div class="rg-trips__seats">
            <div *ngFor="let seat of getSeatArray(trip); let j = index" class="rg-trips__seat" [class.taken]="!seat"></div>
            <span class="rg-trips__seats-label">{{ trip.seatsAvailable }} asiento(s) libre(s)</span>
          </div>

          <div class="rg-trips__footer">
            <div class="rg-trips__price">{{ trip.price | currency:'COP':'symbol':'1.0-0' }}</div>
            <div class="rg-trips__avatar" [style.background]="getAvatarColor(i)">
              {{ trip.driver.initials }}
            </div>
            <div class="rg-trips__stars">⭐ {{ trip.rating }}</div>
          </div>
        </div>
      </div>

      <div class="rg-trips__cta">
        <a routerLink="/viajes" class="rg-btn rg-btn-primary">Ver todos los viajes →</a>
      </div>
    </section>
  `,
  styles: [`
    .rg-trips__title {
      font-size: clamp(1.6rem, 3vw, 2.2rem);
      color: var(--rg-navy);
      margin-bottom: .5rem;
    }
    .rg-trips__sub {
      font-size: 14px;
      color: #888;
      margin-bottom: 2rem;
      line-height: 1.7;
    }
    .rg-trips__grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1rem;
    }
    .rg-trips__card {
      border: 1.5px solid var(--rg-border);
      border-radius: 18px;
      padding: 1.3rem;
      background: #fff;
      transition: box-shadow .2s, transform .2s;
      cursor: pointer;
      &:hover { box-shadow: var(--rg-shadow-md); transform: translateY(-2px); }
    }
    .rg-trips__card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: .4rem;
    }
    .rg-trips__route {
      font-family: var(--rg-font-head);
      font-size: .95rem;
      font-weight: 800;
      color: var(--rg-navy);
    }
    .rg-trips__badge {
      font-size: 11px;
      padding: 3px 10px;
      border-radius: 50px;
      background: rgba(247,164,39,.15);
      color: #d4780a;
      font-weight: 700;
    }
    .rg-trips__meta {
      font-size: 12px;
      color: #aaa;
      margin-bottom: .8rem;
      font-weight: 600;
    }
    .rg-trips__seats {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-bottom: .8rem;
    }
    .rg-trips__seat {
      width: 18px; height: 18px;
      border-radius: 4px;
      background: #f0f0f5;
      &.taken { background: var(--rg-gradient); }
    }
    .rg-trips__seats-label {
      font-size: 11px;
      color: #aaa;
      margin-left: 4px;
      font-weight: 600;
    }
    .rg-trips__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: .8rem;
      border-top: 1px solid var(--rg-border);
    }
    .rg-trips__price {
      font-family: var(--rg-font-head);
      font-size: 1.1rem;
      font-weight: 900;
      color: var(--rg-pink);
    }
    .rg-trips__avatar {
      width: 30px; height: 30px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      color: #fff;
      font-family: var(--rg-font-head);
      font-weight: 700;
      font-size: 11px;
    }
    .rg-trips__stars { font-size: 11px; font-weight: 700; color: var(--rg-orange); }
    .rg-trips__cta { text-align: center; margin-top: 2rem; }
  `]
})
export class TripsPreviewComponent implements OnInit {
  private tripService = inject(TripService);
  trips: Trip[] = [];

  private avatarColors = ['linear-gradient(135deg,#FF7A00,#4B1FA3)', '#1E1E1E', '#4B1FA3', '#FF7A00'];

  ngOnInit(): void {
    this.tripService.getFeaturedTrips().subscribe(t => this.trips = t);
  }

  getSeatArray(trip: Trip): boolean[] {
    return Array.from({ length: trip.seats }, (_, i) => i >= (trip.seats - trip.seatsAvailable));
  }

  getAvatarColor(index: number): string {
    return this.avatarColors[index % this.avatarColors.length];
  }
}
