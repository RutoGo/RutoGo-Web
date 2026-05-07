import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { TripService } from '../../core/services/trip.service';
import { Trip } from '../../core/models/trip.model';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatIconModule,
    NavbarComponent, FooterComponent
  ],
  template: `
    <app-navbar />

    <div class="rg-trips-page">
      <!-- Search bar -->
      <div class="rg-trips-page__search-wrap">
        <form [formGroup]="searchForm" (ngSubmit)="search()" class="rg-trips-page__search">
          <mat-form-field appearance="outline">
            <mat-label>Origen</mat-label>
            <input matInput formControlName="origin" placeholder="Bogotá">
            <mat-icon matPrefix>trip_origin</mat-icon>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Destino</mat-label>
            <input matInput formControlName="destination" placeholder="Medellín">
            <mat-icon matPrefix>place</mat-icon>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Fecha</mat-label>
            <input matInput type="date" formControlName="date">
            <mat-icon matPrefix>event</mat-icon>
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

          <button type="submit" class="rg-btn rg-btn-primary">Buscar →</button>
        </form>
      </div>

      <!-- Results -->
      <div class="rg-section">
        <div class="rg-trips-page__header">
          <h2 class="rg-display rg-trips-page__title">
            {{ trips.length }} viaje(s) encontrado(s)
          </h2>
        </div>

        <div class="rg-trips-page__list">
          <ng-container *ngIf="trips.length > 0; else noTrips">
            <div *ngFor="let trip of trips" class="rg-trips-page__card">
              <div class="rg-trips-page__card-left">
                <div class="rg-trips-page__route">{{ trip.origin }} → {{ trip.destination }}</div>
                <div class="rg-trips-page__meta">{{ trip.date }} · {{ trip.time }} · {{ trip.duration }}</div>
                <div class="rg-trips-page__driver">
                  <div class="rg-trips-page__avatar">{{ trip.driver.initials }}</div>
                  <div>
                    <div class="rg-trips-page__driver-name">{{ trip.driver.name }}</div>
                    <div class="rg-trips-page__driver-meta">
                      ⭐ {{ trip.driver.rating }} · {{ trip.driver.trips }} viajes
                      <span *ngIf="trip.driver.verified" class="rg-trips-page__verified">✓ Verificado</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="rg-trips-page__card-right">
                <div class="rg-trips-page__seats">{{ trip.seatsAvailable }} asiento(s) libre(s)</div>
                <div class="rg-trips-page__price">{{ trip.price | currency:'COP':'symbol':'1.0-0' }}</div>
                <button class="rg-btn rg-btn-primary rg-btn-sm">Reservar →</button>
              </div>
            </div>
          </ng-container>

          <ng-template #noTrips>
            <div class="rg-trips-page__empty">
              <div style="font-size:3rem">🚗</div>
              <p>No encontramos viajes para esta ruta.<br>¡Intenta con otra búsqueda!</p>
            </div>
          </ng-template>
        </div>
      </div>
    </div>

    <app-footer />
  `,
  styles: [`
    .rg-trips-page__search-wrap {
      background: var(--rg-navy);
      padding: 2rem 2.5rem;
    }
    .rg-trips-page__search {
      display: flex;
      gap: 1rem;
      align-items: center;
      flex-wrap: wrap;
      max-width: 1100px;
      margin: 0 auto;
      mat-form-field { flex: 1; min-width: 160px;
        ::ng-deep .mat-mdc-form-field-flex { background: rgb(227, 231, 240); }
        ::ng-deep label, ::ng-deep input { color: #fff !important; }
        ::ng-deep .mat-icon { color: rgba(255,255,255,.6) !important; }
      }
    }
    .rg-trips-page__header { margin-bottom: 1.5rem; }
    .rg-trips-page__title { font-size: 1.4rem; color: var(--rg-navy); }
    .rg-trips-page__list { display: flex; flex-direction: column; gap: 1rem; }
    .rg-trips-page__card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border: 1.5px solid var(--rg-border);
      border-radius: 18px;
      background: #fff;
      gap: 1rem;
      flex-wrap: wrap;
      transition: box-shadow .2s;
      &:hover { box-shadow: var(--rg-shadow-md); }
    }
    .rg-trips-page__card-left { flex: 1; }
    .rg-trips-page__route {
      font-family: var(--rg-font-head); font-size: 1.1rem; font-weight: 800;
      color: var(--rg-navy); margin-bottom: .25rem;
    }
    .rg-trips-page__meta { font-size: 12px; color: #aaa; font-weight: 600; margin-bottom: 1rem; }
    .rg-trips-page__driver { display: flex; align-items: center; gap: .75rem; }
    .rg-trips-page__avatar {
      width: 40px; height: 40px; border-radius: 50%;
      background: var(--rg-gradient);
      color: #fff; font-family: var(--rg-font-head); font-weight: 700;
      display: flex; align-items: center; justify-content: center;
    }
    .rg-trips-page__driver-name { font-weight: 700; font-size: 14px; color: var(--rg-navy); }
    .rg-trips-page__driver-meta { font-size: 12px; color: #aaa; font-weight: 600; }
    .rg-trips-page__verified {
      color: #2d9e60; background: rgba(45,158,96,.12);
      padding: 2px 7px; border-radius: 50px; margin-left: 4px;
    }
    .rg-trips-page__card-right {
      display: flex; flex-direction: column; align-items: flex-end; gap: .5rem;
    }
    .rg-trips-page__seats { font-size: 12px; color: #aaa; font-weight: 600; }
    .rg-trips-page__price {
      font-family: var(--rg-font-head); font-size: 1.4rem; font-weight: 900; color: var(--rg-pink);
    }
    .rg-trips-page__empty {
      text-align: center; padding: 4rem; color: #aaa;
      p { margin-top: 1rem; font-size: 15px; line-height: 1.7; }
    }
  `]
})
export class TripsComponent implements OnInit {
  private fb          = inject(FormBuilder);
  private tripService = inject(TripService);

  trips: Trip[] = [];

  searchForm = this.fb.group({
    origin:      [''],
    destination: [''],
    date:        [''],
    passengers:  [1]
  });

  ngOnInit(): void {
    this.tripService.searchTrips({ origin: '', destination: '', date: '', passengers: 1 })
      .subscribe(t => this.trips = t);
  }

  search(): void {
    this.tripService.searchTrips(this.searchForm.value as any)
      .subscribe(t => this.trips = t);
  }
}
