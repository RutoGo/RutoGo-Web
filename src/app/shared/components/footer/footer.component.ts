import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="rg-footer">
      <div class="rg-footer__logo">
        <img src="assets/images/LOGO_1.png" alt="RutoGo" class="rg-footer__logo-icon" />
        <span class="rg-footer__logo-text"><span class="rg-pink">Ruto</span><span class="rg-orange">Go</span></span>
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
      display: flex; align-items: center; gap: 8px;
    }
    .rg-footer__logo-icon {
      width: 34px; height: 34px;
      display: block;
      object-fit: contain;
    }
    .rg-footer__logo-text {
      font-family: var(--rg-font-head);
      font-weight: 900;
      font-size: 1.25rem;
      color: var(--rg-navy);
    }
    .rg-footer__logo-text .rg-pink { color: var(--rg-pink); }
    .rg-footer__logo-text .rg-orange { color: var(--rg-orange); }
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
