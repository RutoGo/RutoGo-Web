import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../core/models/trip.model';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  template: `
    <div class="rg-page-shell">
      <section class="rg-section rg-section--search">
        <form [formGroup]="searchForm" (ngSubmit)="search()" class="rg-search-grid">
          <mat-form-field appearance="outline">
            <mat-label>Origen</mat-label>
            <input matInput formControlName="origin" placeholder="Bogotá" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Destino</mat-label>
            <input matInput formControlName="destination" placeholder="Medellín" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Fecha</mat-label>
            <input matInput type="date" formControlName="date" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Pasajeros</mat-label>
            <mat-select formControlName="passengers">
              <mat-option [value]="1">1</mat-option>
              <mat-option [value]="2">2</mat-option>
              <mat-option [value]="3">3</mat-option>
              <mat-option [value]="4">4</mat-option>
            </mat-select>
          </mat-form-field>

          <button mat-flat-button color="primary" class="rg-search-button" type="submit">
            Buscar viajes
          </button>
        </form>
      </section>

      <section class="rg-section rg-section--results">
        <div class="rg-results-header">
          <h2>Viajes disponibles</h2>
          <span>{{ trips.length }} resultados</span>
        </div>

        <div class="rg-card-grid">
          <mat-card *ngFor="let trip of trips" class="rg-trip-card">
            <div class="rg-card-header">
              <div>
                <h3>{{ trip.origin }} → {{ trip.destination }}</h3>
                <p>{{ trip.date }} · {{ trip.time }} · {{ trip.duration }}</p>
              </div>
              <div class="rg-price">{{ trip.price | currency:'COP':'symbol':'1.0-0' }}</div>
            </div>

            <div class="rg-card-body">
              <p>{{ trip.seatsAvailable }} asientos libres · {{ trip.seats }} totales</p>
              <p>Conductor: {{ trip.driver.name }} · ⭐ {{ trip.driver.rating }}</p>
            </div>

            <button mat-stroked-button color="primary" class="rg-book-button">Reservar</button>
          </mat-card>
        </div>
      </section>
    </div>
  `,
  styles: [
    `.rg-page-shell { padding: 1.5rem; max-width: 1200px; margin: 0 auto; }
     .rg-search-grid { display: grid; gap: 1rem; grid-template-columns: repeat(4, minmax(0, 1fr)); align-items: end; }
     .rg-search-grid mat-form-field { width: 100%; }
     .rg-search-grid ::ng-deep .mat-mdc-form-field-flex { background: #ffffff !important; }
     .rg-search-grid ::ng-deep .mat-mdc-form-field-outline { border-color: rgba(0,0,0,.16) !important; }
     .rg-search-grid ::ng-deep .mat-mdc-form-field-infix, .rg-search-grid ::ng-deep input.mat-mdc-text-field-input, .rg-search-grid ::ng-deep .mat-mdc-select-trigger { color: #1a2d5a !important; }
     .rg-search-grid ::ng-deep .mat-mdc-form-field-label { color: rgba(0,0,0,.75) !important; }
     .rg-search-button { grid-column: span 1; width: 100%; height: 48px; background: #ffffff !important; color: var(--rg-navy) !important; border: 1px solid var(--rg-navy) !important; }
     .rg-book-button { width: 100%; background: #ffffff !important; color: var(--rg-navy) !important; border: 1px solid var(--rg-navy) !important; }
     .rg-results-header { display: flex; justify-content: space-between; align-items: center; margin: 1.5rem 0; }
     .rg-card-grid { display: grid; gap: 1rem; }
     .rg-trip-card { padding: 1rem; }
     .rg-card-header { display: flex; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: 1rem; }
     .rg-price { font-size: 1.4rem; font-weight: 800; color: #d81b60; }
     .rg-card-body { color: #535353; font-size: .95rem; margin-bottom: 1rem; }
     @media (max-width: 960px) { .rg-search-grid { grid-template-columns: 1fr; } }
    `
  ]
})
export class TripListComponent implements OnInit {
  private fb = inject(FormBuilder);
  private tripService = inject(TripService);

  searchForm = this.fb.group({
    origin: [''],
    destination: [''],
    date: [''],
    passengers: [1]
  });

  trips: Trip[] = [];

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    const value = this.searchForm.value;
    const filters = {
      origin: value.origin ?? '',
      destination: value.destination ?? '',
      date: value.date ?? '',
      passengers: value.passengers ?? 1
    };

    this.tripService.getTrips(filters).subscribe({
      next: trips => this.trips = trips,
      error: () => this.trips = []
    });
  }
}
