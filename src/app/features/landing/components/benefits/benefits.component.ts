import { Component } from '@angular/core';

interface Benefit { icon: string; color: string; title: string; desc: string; }

@Component({
  selector: 'app-benefits',
  standalone: true,
  template: `
    <section class="rg-section text-center">
      <div class="rg-section-tag">Beneficios</div>
      <h2 class="rg-display rg-benefits__title">
        ¿Por qué elegir <span class="rg-orange">Ruto</span><span class="rg-pink">Go</span>?
      </h2>
      <p class="rg-benefits__sub">Más que una app de viajes, somos una comunidad que transforma tu forma de moverte</p>

      <div class="rg-benefits__grid">
        @for (b of benefits; track b.title) {
          <div class="rg-card rg-benefits__card">
            <div class="rg-benefits__icon" [style.background]="b.color">{{ b.icon }}</div>
            <h4 class="rg-benefits__card-title">{{ b.title }}</h4>
            <p class="rg-benefits__card-desc">{{ b.desc }}</p>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .rg-benefits__title {
      font-size: clamp(1.6rem, 3vw, 2.2rem);
      color: var(--rg-navy);
      margin-bottom: .5rem;
    }
    .rg-benefits__sub {
      font-size: 14px;
      color: #888;
      max-width: 480px;
      margin: 0 auto 2rem;
      line-height: 1.7;
    }
    .rg-benefits__grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1.2rem;
      text-align: left;
    }
    .rg-benefits__card {
      padding: 1.5rem;
      background: #f9f9fb;
      border-radius: 20px;
    }
    .rg-benefits__icon {
      width: 52px; height: 52px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      margin-bottom: 1rem;
    }
    .rg-benefits__card-title {
      font-family: var(--rg-font-head);
      font-size: 1rem;
      font-weight: 800;
      color: var(--rg-navy);
      margin-bottom: .4rem;
    }
    .rg-benefits__card-desc {
      font-size: 13px;
      color: #777;
      line-height: 1.6;
    }
  `]
})
export class BenefitsComponent {
  benefits: Benefit[] = [
    { icon: '💰', color: '#f7a427', title: 'Ahorra dinero',
      desc: 'Reduce tus costos de viaje hasta un 70% compartiendo gastos de combustible y peajes' },
    { icon: '🛡️', color: '#1a2d5a', title: 'Viaja seguro',
      desc: 'Conductores verificados, valoraciones de usuarios y seguimiento en tiempo real de cada viaje' },
    { icon: '👥', color: '#f03e6e', title: 'Comunidad increíble',
      desc: 'Conoce personas geniales, comparte experiencias y haz amigos en cada trayecto' }
  ];
}
