import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatButtonModule, MatIconModule, MatMenuModule],
  template: `
    <nav class="rg-navbar">
      <a routerLink="/" class="rg-navbar__logo">
        <div class="rg-navbar__logo-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="white" stroke-width="2.5" fill="none"/>
            <path d="M8 8 Q12 10 12 12 Q12 14 16 16" stroke="white" stroke-width="2" stroke-linecap="round" fill="none"/>
            <circle cx="16" cy="16" r="2" fill="white"/>
          </svg>
        </div>
        <span class="rg-navbar__logo-text">Ruto<span>Go</span></span>
      </a>

      <div class="rg-navbar__links">
        <a routerLink="/" class="rg-navbar__link">Cómo funciona</a>
        <a routerLink="/viajes" class="rg-navbar__link">Viajes</a>
        <a class="rg-navbar__link">Promociones</a>
      </div>

      <div class="rg-navbar__actions">
        @if (auth.isLoggedIn()) {
          <button mat-icon-button [matMenuTriggerFor]="userMenu">
            <div class="rg-navbar__avatar">{{ auth.user()?.name?.charAt(0) }}</div>
          </button>
          <mat-menu #userMenu="matMenu">
            <button mat-menu-item routerLink="/dashboard">
              <mat-icon>dashboard</mat-icon> Mi panel
            </button>
            <button mat-menu-item (click)="auth.logout()">
              <mat-icon>logout</mat-icon> Cerrar sesión
            </button>
          </mat-menu>
        } @else {
          <a routerLink="/auth/login" class="rg-navbar__link rg-navbar__link--login">Iniciar Sesión</a>
          <a routerLink="/auth/register" class="rg-btn rg-btn-primary rg-btn-sm">Registrarse</a>
        }
      </div>
    </nav>
  `,
  styles: [`
    .rg-navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: .9rem 2.5rem;
      background: rgba(255,255,255,.97);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid var(--rg-border);
      position: sticky;
      top: 0;
      z-index: 100;
      gap: 1rem;
    }
    .rg-navbar__logo {
      display: flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
    }
    .rg-navbar__logo-icon {
      width: 30px; height: 30px;
      background: var(--rg-gradient);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      svg { width: 17px; height: 17px; }
    }
    .rg-navbar__logo-text {
      font-family: var(--rg-font-head);
      font-weight: 900;
      font-size: 1.3rem;
      color: var(--rg-navy);
      span { color: var(--rg-pink); }
    }
    .rg-navbar__links {
      display: flex;
      align-items: center;
      gap: 2rem;
    }
    .rg-navbar__link {
      font-size: 14px;
      font-weight: 600;
      color: #555;
      text-decoration: none;
      cursor: pointer;
      transition: color .15s;
    }
    .rg-navbar__link:hover { color: var(--rg-navy); }
    .rg-navbar__link--login { color: var(--rg-navy); }
    .rg-navbar__actions {
      display: flex;
      align-items: center;
      gap: .75rem;
    }
    .rg-navbar__avatar {
      width: 34px; height: 34px;
      border-radius: 50%;
      background: var(--rg-gradient);
      color: #fff;
      font-family: var(--rg-font-head);
      font-weight: 800;
      font-size: 15px;
      display: flex; align-items: center; justify-content: center;
    }
    @media (max-width: 768px) {
      .rg-navbar__links { display: none; }
      .rg-navbar { padding: .9rem 1.2rem; }
    }
  `]
})
export class NavbarComponent {
  auth = inject(AuthService);
}
