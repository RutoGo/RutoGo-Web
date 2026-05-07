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

      <section class="rg-landing-search-section">
        <div class="rg-landing-search-shell">
          <div class="rg-landing-search-title-wrap">
            <span class="rg-landing-search-tag">RUTAS DESTACADAS</span>
            <h2>Viajes <span class="rg-landing-search-highlight">disponibles</span> hoy</h2>
          </div>
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
              Buscar viaje →
            </button>
          </form>
        </div>
      </section>

      <app-stats />
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
     .rg-landing-search-title-wrap { display: flex; flex-direction: column; align-items: flex-start; gap: .8rem; margin-bottom: 1rem; }
     .rg-landing-search-tag {
       display: inline-flex;
       align-items: center;
       justify-content: center;
       padding: 6px 14px;
       border-radius: 999px;
       background: rgba(255,122,0,.12);
       color: var(--rg-orange);
       font-size: 12px;
       font-weight: 700;
       letter-spacing: .15em;
       text-transform: uppercase;
     }
     .rg-landing-search-shell h2 {
       font-size: clamp(2rem, 3vw, 3rem);
       margin: 0;
       color: var(--rg-navy);
       font-weight: 900;
       letter-spacing: -0.04em;
       line-height: 1.04;
     }
     .rg-landing-search-highlight {
       background: linear-gradient(135deg, var(--rg-orange), var(--rg-pink));
       -webkit-background-clip: text;
       color: transparent;
       text-decoration: underline;
       text-decoration-color: rgba(255,122,0,.65);
       text-underline-offset: 0.5rem;
     }
     .rg-landing-search-form { display: grid; gap: 1rem; grid-template-columns: repeat(4, minmax(0, 1fr)); align-items: end; }
     .rg-landing-search-form mat-form-field { width: 100%; }
     .rg-landing-search-button {
       width: 100%;
       max-width: 260px;
       grid-column: 1 / -1;
       justify-self: center;
       height: 52px;
       border-radius: 999px;
       background: linear-gradient(135deg, var(--rg-orange), var(--rg-pink));
       color: #fff !important;
       font-weight: 800;
       box-shadow: 0 14px 40px rgba(75,31,163,.18);
       transition: transform .2s ease, filter .2s ease;
     }
     .rg-landing-search-button:hover {
       transform: translateY(-1px);
       filter: brightness(1.03);
     }
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
