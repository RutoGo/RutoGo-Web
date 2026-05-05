import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="rg-footer">
      <div class="rg-footer__logo">
        <div class="rg-footer__logo-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="white" stroke-width="2.5" fill="none"/>
            <path d="M8 8 Q12 10 12 12 Q12 14 16 16" stroke="white" stroke-width="2" stroke-linecap="round" fill="none"/>
            <circle cx="16" cy="16" r="2" fill="white"/>
          </svg>
        </div>
        <span class="rg-footer__logo-text">Ruto<span>Go</span></span>
      </div>
      <div class="rg-footer__links">
        <a class="rg-footer__link">Sobre nosotros</a>
        <a class="rg-footer__link">Términos</a>
        <a class="rg-footer__link">Privacidad</a>
        <a class="rg-footer__link">Contacto</a>
      </div>
      <div class="rg-footer__copy">© 2026 RutoGo. Todos los derechos reservados.</div>
    </footer>
  `,
  styles: [`
    .rg-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: .75rem;
      padding: 1.5rem 2.5rem;
      border-top: 1px solid var(--rg-border);
    }
    .rg-footer__logo {
      display: flex; align-items: center; gap: 7px;
    }
    .rg-footer__logo-icon {
      width: 24px; height: 24px;
      background: var(--rg-gradient);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      svg { width: 14px; height: 14px; }
    }
    .rg-footer__logo-text {
      font-family: var(--rg-font-head);
      font-weight: 900;
      font-size: 1.1rem;
      color: var(--rg-navy);
      span { color: var(--rg-pink); }
    }
    .rg-footer__links {
      display: flex;
      gap: 1.5rem;
      flex-wrap: wrap;
    }
    .rg-footer__link {
      font-size: 12px;
      font-weight: 600;
      color: #aaa;
      cursor: pointer;
      text-decoration: none;
      &:hover { color: var(--rg-navy); }
    }
    .rg-footer__copy {
      font-size: 12px;
      color: #ccc;
      font-weight: 600;
    }
  `]
})
export class FooterComponent {}
