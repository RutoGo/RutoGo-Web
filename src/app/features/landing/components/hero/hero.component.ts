import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="rg-hero">
      <div class="rg-hero__tag">✨ Tu próximo viaje empieza aquí</div>
      <h1 class="rg-hero__title rg-display">
        Viaja <span class="rg-orange">inteligente</span><br>
        <span class="rg-pink rg-hero__underline">comparte tu ruta</span>
      </h1>
      <p class="rg-hero__sub">
        Conecta con viajeros, ahorra dinero y contribuye al medio ambiente.<br>
        La forma más económica y social de viajar.
      </p>
      <div class="rg-hero__actions">
        <a routerLink="/viajes" class="rg-btn rg-btn-primary rg-btn-lg">Buscar Viaje →</a>
        <a routerLink="/auth/register" class="rg-btn rg-btn-dark rg-btn-lg">Publicar Viaje</a>
      </div>
    </section>
  `,
  styles: [`
    .rg-hero {
      background: var(--rg-bg-hero);
      padding: 5rem 2.5rem 4rem;
      text-align: center;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: -80px; right: -80px;
        width: 300px; height: 300px;
        background: rgba(247,164,39,.08);
        border-radius: 50%;
        pointer-events: none;
      }
    }
    .rg-hero__tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(240,62,110,.1);
      color: var(--rg-pink);
      font-size: 13px;
      font-weight: 700;
      padding: 7px 18px;
      border-radius: 50px;
      margin-bottom: 1.5rem;
      border: 1px solid rgba(240,62,110,.2);
    }
    .rg-hero__title {
      font-size: clamp(2.4rem, 5vw, 3.5rem);
      color: var(--rg-navy);
      margin-bottom: 1.2rem;
    }
    .rg-hero__underline {
      text-decoration: underline;
      text-decoration-color: var(--rg-orange);
      text-underline-offset: 5px;
    }
    .rg-hero__sub {
      font-size: 15px;
      color: #666;
      line-height: 1.7;
      max-width: 520px;
      margin: 0 auto 2.2rem;
    }
    .rg-hero__actions {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
    }
  `]
})
export class HeroComponent {}
