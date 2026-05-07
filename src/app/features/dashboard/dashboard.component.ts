import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatIconModule, MatButtonModule, NavbarComponent, FooterComponent],
  template: `
    <app-navbar />

    <div class="rg-dashboard">
      <div class="rg-section">
        <!-- Greeting -->
        <div class="rg-dash__greeting">
          <div class="rg-dash__avatar">{{ auth.user()?.name?.charAt(0) ?? 'U' }}</div>
          <div>
            <h1 class="rg-display rg-dash__title">Hola, {{ auth.user()?.name ?? 'Viajero' }} 👋</h1>
            <p class="rg-dash__sub">Bienvenido a tu panel de RutoGo</p>
          </div>
        </div>

        <!-- Quick stats -->
        <div class="rg-dash__stats">
          <div *ngFor="let stat of stats" class="rg-dash__stat-card" [style.border-top-color]="stat.color">
            <div class="rg-dash__stat-icon" [style.color]="stat.color">{{ stat.icon }}</div>
            <div class="rg-dash__stat-value">{{ stat.value }}</div>
            <div class="rg-dash__stat-label">{{ stat.label }}</div>
          </div>
        </div>

        <!-- Quick actions -->
        <h2 class="rg-dash__section-title rg-display">Acciones rápidas</h2>
        <div class="rg-dash__actions">
          <a routerLink="/viajes" class="rg-dash__action-card">
            <div class="rg-dash__action-icon" style="background:#FF7A00">🔍</div>
            <div class="rg-dash__action-title">Buscar viaje</div>
            <div class="rg-dash__action-desc">Encuentra tu próxima ruta</div>
          </a>
          <div class="rg-dash__action-card">
            <div class="rg-dash__action-icon" style="background:#4B1FA3">➕</div>
            <div class="rg-dash__action-title">Publicar viaje</div>
            <div class="rg-dash__action-desc">Ofrece tu ruta y gana</div>
          </div>
          <div class="rg-dash__action-card">
            <div class="rg-dash__action-icon" style="background:#1E1E1E">📋</div>
            <div class="rg-dash__action-title">Mis reservas</div>
            <div class="rg-dash__action-desc">Historial de viajes</div>
          </div>
          <div class="rg-dash__action-card">
            <div class="rg-dash__action-icon" style="background:#2d9e60">⚙️</div>
            <div class="rg-dash__action-title">Mi perfil</div>
            <div class="rg-dash__action-desc">Edita tu información</div>
          </div>
        </div>

        <!-- Logout -->
        <div style="margin-top:2rem;text-align:right">
          <button class="rg-btn rg-btn-outline" (click)="auth.logout()">Cerrar sesión</button>
        </div>
      </div>
    </div>

    <app-footer />
  `,
  styles: [`
    .rg-dashboard { background: var(--rg-bg-soft); min-height: 80vh; }
    .rg-dash__greeting {
      display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;
    }
    .rg-dash__avatar {
      width: 56px; height: 56px; border-radius: 50%;
      background: var(--rg-gradient);
      color: #fff; font-family: var(--rg-font-head); font-weight: 900; font-size: 1.5rem;
      display: flex; align-items: center; justify-content: center;
    }
    .rg-dash__title { font-size: 1.8rem; color: var(--rg-navy); }
    .rg-dash__sub { font-size: 14px; color: #888; }
    .rg-dash__stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 1rem; margin-bottom: 2.5rem;
    }
    .rg-dash__stat-card {
      background: #fff; border-radius: 16px; padding: 1.3rem;
      border-top: 3px solid transparent;
      box-shadow: var(--rg-shadow-sm);
      text-align: center;
    }
    .rg-dash__stat-icon { font-size: 1.5rem; margin-bottom: .4rem; }
    .rg-dash__stat-value {
      font-family: var(--rg-font-head); font-size: 1.6rem; font-weight: 900;
      color: var(--rg-navy);
    }
    .rg-dash__stat-label { font-size: 12px; color: #888; font-weight: 600; }
    .rg-dash__section-title { font-size: 1.2rem; color: var(--rg-navy); margin-bottom: 1rem; }
    .rg-dash__actions {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1rem;
    }
    .rg-dash__action-card {
      background: #fff; border-radius: 18px; padding: 1.5rem;
      cursor: pointer; text-decoration: none; color: inherit;
      border: 1px solid var(--rg-border);
      transition: box-shadow .2s, transform .2s;
      &:hover { box-shadow: var(--rg-shadow-md); transform: translateY(-2px); }
    }
    .rg-dash__action-icon {
      width: 48px; height: 48px; border-radius: 14px;
      display: flex; align-items: center; justify-content: center;
      font-size: 22px; margin-bottom: .75rem;
    }
    .rg-dash__action-title {
      font-family: var(--rg-font-head); font-size: 1rem; font-weight: 800;
      color: var(--rg-navy); margin-bottom: .25rem;
    }
    .rg-dash__action-desc { font-size: 12px; color: #aaa; }
  `]
})
export class DashboardComponent {
  auth = inject(AuthService);

  stats = [
    { icon: '✈️', value: '0',   label: 'Viajes realizados', color: '#FF7A00' },
    { icon: '⭐', value: '—',   label: 'Mi valoración',      color: '#4B1FA3' },
    { icon: '💰', value: '$0',  label: 'Ahorrado',           color: '#2d9e60' },
    { icon: '👥', value: '0',   label: 'Compañeros',         color: '#1E1E1E' }
  ];
}
