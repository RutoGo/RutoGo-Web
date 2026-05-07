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
        <img src="assets/images/LOGO_1.png" alt="RutoGo" class="rg-navbar__logo-icon" />
        <span class="rg-navbar__logo-text"><span class="rg-pink">Ruto</span><span class="rg-orange">Go</span></span>
      </a>

      <div class="rg-navbar__links">
        <a routerLink="/" class="rg-navbar__link">Cómo funciona</a>
        <a routerLink="/viajes" class="rg-navbar__link">Viajes</a>
        <a class="rg-navbar__link">Promociones</a>
      </div>

      <div class="rg-navbar__actions">
        <ng-container *ngIf="auth.isLoggedIn(); else guestLinks">
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
        </ng-container>

        <ng-template #guestLinks>
          <a routerLink="/auth/login" class="rg-navbar__link rg-navbar__link--login">Iniciar Sesión</a>
          <a routerLink="/auth/register" class="rg-btn rg-btn-primary rg-btn-sm">Registrarse</a>
        </ng-template>
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
      gap: 10px;
      text-decoration: none;
    }
    .rg-navbar__logo-icon {
      width: 42px; height: 42px;
      border-radius: 12px;
      object-fit: contain;
      display: block;
      background: transparent;
    }
    .rg-navbar__logo-text {
      font-family: var(--rg-font-head);
      font-weight: 900;
      font-size: 1.45rem;
      color: var(--rg-navy);
    }
    .rg-navbar__logo-text .rg-pink { color: var(--rg-pink); }
    .rg-navbar__logo-text .rg-orange { color: var(--rg-orange); }
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
