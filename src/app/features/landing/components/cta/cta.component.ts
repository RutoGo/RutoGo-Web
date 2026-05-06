import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="rg-cta-wrap">
      <div class="rg-cta">
        <h2 class="rg-display rg-cta__title">
          ¿Listo para tu próxima <span class="rg-orange">aventura?</span>
        </h2>
        <p class="rg-cta__sub">
          Únete a miles de viajeros que ya están ahorrando dinero y haciendo amigos en cada viaje
        </p>
        <div class="rg-cta__actions">
          <button class="rg-btn rg-btn-primary rg-btn-lg">Descargar App →</button>
          <a routerLink="/auth/register" class="rg-btn rg-btn-white rg-btn-lg">Registrarse gratis</a>
        </div>
        <div class="rg-cta__trust">
          <span class="rg-cta__trust-item"><span class="rg-cta__dot dot-pink"></span>Registro gratuito</span>
          <span class="rg-cta__trust-item"><span class="rg-cta__dot dot-orange"></span>Sin comisiones</span>
          <span class="rg-cta__trust-item"><span class="rg-cta__dot dot-orange"></span>100% seguro</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .rg-cta-wrap { padding: 2rem 2.5rem 3rem; }
    .rg-cta {
      background: var(--rg-navy);
      border-radius: 24px;
      padding: 3.5rem 2rem;
      text-align: center;
      max-width: 1100px;
      margin: 0 auto;
      position: relative;
      overflow: hidden;
      &::before {
        content: '';
        position: absolute;
        top: -70px; right: -70px;
        width: 220px; height: 220px;
        background: rgba(247,164,39,.12);
        border-radius: 50%;
        pointer-events: none;
      }
      &::after {
        content: '';
        position: absolute;
        bottom: -70px; left: -50px;
        width: 180px; height: 180px;
        background: rgba(75,31,163,.12);
        border-radius: 50%;
        pointer-events: none;
      }
    }
    .rg-cta__title {
      font-size: clamp(1.6rem, 4vw, 2.4rem);
      color: #fff;
      margin-bottom: .6rem;
      position: relative; z-index: 1;
    }
    .rg-cta__sub {
      font-size: 14px;
      color: rgba(255,255,255,.65);
      margin-bottom: 2rem;
      position: relative; z-index: 1;
      max-width: 480px;
      margin-left: auto; margin-right: auto;
    }
    .rg-cta__actions {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
      position: relative; z-index: 1;
      margin-bottom: 1.5rem;
    }
    .rg-cta__trust {
      display: flex;
      gap: 1.5rem;
      justify-content: center;
      flex-wrap: wrap;
      position: relative; z-index: 1;
    }
    .rg-cta__trust-item {
      font-size: 12px;
      color: rgba(255,255,255,.55);
      display: flex;
      align-items: center;
      gap: 5px;
      font-weight: 600;
    }
    .rg-cta__dot {
      width: 7px; height: 7px;
      border-radius: 50%;
      flex-shrink: 0;
      &.dot-pink   { background: var(--rg-pink); }
      &.dot-orange { background: var(--rg-orange); }
    }
  `]
})
export class CtaComponent {}
