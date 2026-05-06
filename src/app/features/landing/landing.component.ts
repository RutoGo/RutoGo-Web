import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { StatsComponent } from './components/stats/stats.component';
import { BenefitsComponent } from './components/benefits/benefits.component';
import { TripsPreviewComponent } from './components/trips/trips-preview.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { CtaComponent } from './components/cta/cta.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    HeroComponent,
    StatsComponent,
    BenefitsComponent,
    TripsPreviewComponent,
    HowItWorksComponent,
    CtaComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],
  template: `
    <app-navbar />
    <main>
      <app-hero />
      <app-stats />

      <section class="rg-landing-search-section">
        <div class="rg-landing-search-shell">
          <h2>Busca el viaje ideal</h2>
          <form class="rg-landing-search-form" (submit)="goToTrips()">
            <mat-form-field appearance="outline">
              <mat-label>Origen</mat-label>
              <input matInput [(ngModel)]="origin" name="origin" placeholder="Bogotá" />
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Destino</mat-label>
              <input matInput [(ngModel)]="destination" name="destination" placeholder="Medellín" />
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Fecha</mat-label>
              <input matInput type="date" [(ngModel)]="date" name="date" />
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Pasajeros</mat-label>
              <mat-select [(ngModel)]="passengers" name="passengers">
                <mat-option [value]="1">1</mat-option>
                <mat-option [value]="2">2</mat-option>
                <mat-option [value]="3">3</mat-option>
                <mat-option [value]="4">4</mat-option>
              </mat-select>
            </mat-form-field>

            <button mat-flat-button color="primary" class="rg-landing-search-button" type="submit">
              Buscar viaje
            </button>
          </form>
        </div>
      </section>

      <app-benefits />
      <app-trips-preview />
      <app-how-it-works />
      <app-cta />
    </main>
    <app-footer />
  `,
  styles: [
    `.rg-landing-search-section { padding: 2rem 2.5rem; background: #f6f8ff; }
     .rg-landing-search-shell { max-width: 1100px; margin: 0 auto; }
     .rg-landing-search-shell h2 { font-size: clamp(1.6rem, 2.7vw, 2.3rem); margin-bottom: 1rem; color: var(--rg-navy); }
     .rg-landing-search-form { display: grid; gap: 1rem; grid-template-columns: repeat(4, minmax(0, 1fr)); align-items: end; }
     .rg-landing-search-form mat-form-field { width: 100%; }
     .rg-landing-search-button { width: 100%; height: 50px; }
     @media (max-width: 960px) { .rg-landing-search-form { grid-template-columns: 1fr; } }
    `
  ]
})
export class LandingComponent {
  private router = inject(Router);

  origin = '';
  destination = '';
  date = '';
  passengers = 1;

  goToTrips(): void {
    this.router.navigate(['/viajes']);
  }
}
