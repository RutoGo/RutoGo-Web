import { Component } from '@angular/core';

interface Step { num: string; icon: string; color: string; title: string; desc: string; }

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  template: `
    <div class="rg-how">
      <div class="text-center rg-how__header">
        <h2 class="rg-display rg-how__title">
          Tan fácil como
          <span class="rg-orange">1,</span>
          <span class="rg-pink">2,</span>
          <span class="rg-navy">3</span>
        </h2>
        <p class="rg-how__sub">En solo 3 pasos estarás listo para tu próxima aventura</p>
      </div>

      <div class="rg-how__steps">
        <div class="rg-how__line"></div>
        @for (step of steps; track step.num) {
          <div class="rg-how__step">
            <div class="rg-how__icon-wrap" [style.background]="step.color">
              <div class="rg-how__step-num">{{ step.num }}</div>
              <div class="rg-how__icon">{{ step.icon }}</div>
            </div>
            <h4 class="rg-how__step-title">{{ step.title }}</h4>
            <p class="rg-how__step-desc">{{ step.desc }}</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .rg-how {
      background: linear-gradient(160deg, #fff5f7, #fff9f0);
      padding: 3.5rem 2.5rem;
    }
    .rg-how__header { margin-bottom: 3rem; }
    .rg-how__title {
      font-size: clamp(1.8rem, 4vw, 2.6rem);
      color: var(--rg-navy);
      margin-bottom: .5rem;
    }
    .rg-how__sub {
      font-size: 14px;
      color: #888;
    }
    .rg-how__steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      max-width: 900px;
      margin: 0 auto;
      position: relative;
    }
    .rg-how__line {
      display: none;
      position: absolute;
      top: 55px; left: 15%; right: 15%;
      height: 2px;
      background: linear-gradient(90deg, var(--rg-pink), var(--rg-orange));
      @media (min-width: 600px) { display: block; }
    }
    .rg-how__step {
      text-align: center;
      position: relative;
      z-index: 1;
    }
    .rg-how__icon-wrap {
      width: 80px; height: 80px;
      border-radius: 22px;
      margin: 0 auto 1rem;
      display: flex; align-items: center; justify-content: center;
      position: relative;
    }
    .rg-how__step-num {
      position: absolute;
      top: -10px; left: -10px;
      font-family: var(--rg-font-head);
      font-size: 2rem;
      font-weight: 900;
      color: rgba(255,255,255,.25);
      line-height: 1;
    }
    .rg-how__icon { font-size: 32px; }
    .rg-how__step-title {
      font-family: var(--rg-font-head);
      font-size: 1rem;
      font-weight: 800;
      color: var(--rg-navy);
      margin-bottom: .3rem;
    }
    .rg-how__step-desc {
      font-size: 12px;
      color: #888;
      line-height: 1.6;
      max-width: 180px;
      margin: 0 auto;
    }
  `]
})
export class HowItWorksComponent {
  steps: Step[] = [
    { num: '01', icon: '📍', color: '#f7a427', title: 'Busca tu ruta',
      desc: 'Ingresa origen, destino y fecha. Encuentra cientos de opciones disponibles' },
    { num: '02', icon: '📅', color: '#f03e6e', title: 'Reserva tu viaje',
      desc: 'Elige al conductor que mejor se adapte a ti, reserva y confirma en segundos' },
    { num: '03', icon: '🚗', color: '#1a2d5a', title: '¡A viajar!',
      desc: 'Sube al auto, disfruta el viaje y comparte una experiencia inolvidable' }
  ];
}
