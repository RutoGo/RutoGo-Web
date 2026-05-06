import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Stat { value: string; label: string; }

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rg-stats">
      <div *ngFor="let stat of stats" class="rg-stats__card">
        <div class="rg-stats__number">{{ stat.value }}</div>
        <div class="rg-stats__label">{{ stat.label }}</div>
      </div>
    </div>
  `,
  styles: [`
    .rg-stats {
      display: flex;
      justify-content: center;
      gap: 1.2rem;
      flex-wrap: wrap;
      padding: 1.5rem 2.5rem 3rem;
      background: linear-gradient(160deg, #fff5f7 0%, #fff9f0 50%, #f0f4ff 100%);
    }
    .rg-stats__card {
      background: #fff;
      border-radius: 16px;
      padding: 1rem 2rem;
      text-align: center;
      box-shadow: 0 2px 16px rgba(0,0,0,.06);
      min-width: 140px;
    }
    .rg-stats__number {
      font-family: var(--rg-font-head);
      font-size: 1.8rem;
      font-weight: 900;
      color: var(--rg-pink);
    }
    .rg-stats__label {
      font-size: 12px;
      color: #888;
      font-weight: 600;
      margin-top: 3px;
    }
  `]
})
export class StatsComponent {
  stats: Stat[] = [
    { value: '500K+', label: 'Viajeros activos' },
    { value: '2M+',   label: 'Viajes completados' },
    { value: '4.8★',  label: 'Valoración promedio' }
  ];
}
