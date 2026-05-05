import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink,
    MatFormFieldModule, MatInputModule, MatButtonModule,
    MatProgressSpinnerModule, MatIconModule
  ],
  template: `
    <div class="rg-auth">
      <div class="rg-auth__panel">
        <a routerLink="/" class="rg-auth__logo">
          <div class="rg-auth__logo-icon"></div>
          <span>Ruto<span class="pink">Go</span></span>
        </a>
        <h1 class="rg-auth__title rg-display">Bienvenido de nuevo</h1>
        <p class="rg-auth__sub">Inicia sesión para continuar tu aventura</p>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="rg-auth__form">
          <mat-form-field appearance="outline">
            <mat-label>Correo electrónico</mat-label>
            <input matInput type="email" formControlName="email" placeholder="tu@email.com">
            <mat-icon matPrefix>email</mat-icon>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Contraseña</mat-label>
            <input matInput [type]="showPass ? 'text' : 'password'" formControlName="password">
            <mat-icon matPrefix>lock</mat-icon>
            <mat-icon matSuffix (click)="showPass = !showPass" style="cursor:pointer">
              {{ showPass ? 'visibility_off' : 'visibility' }}
            </mat-icon>
          </mat-form-field>

          @if (error) {
            <div class="rg-auth__error">{{ error }}</div>
          }

          <button type="submit" class="rg-btn rg-btn-primary rg-btn-lg rg-auth__submit"
                  [disabled]="loading || form.invalid">
            @if (loading) {
              <mat-spinner diameter="20" />
            } @else {
              Iniciar sesión →
            }
          </button>
        </form>

        <p class="rg-auth__footer">
          ¿No tienes cuenta? <a routerLink="/auth/register" class="rg-auth__link">Regístrate gratis</a>
        </p>
      </div>

      <div class="rg-auth__visual">
        <div class="rg-auth__visual-content">
          <div class="rg-auth__quote">"Compartir el camino hace el viaje más rico"</div>
          <div class="rg-auth__visual-stats">
            <div><span>500K+</span> Viajeros</div>
            <div><span>2M+</span> Viajes</div>
            <div><span>4.8★</span> Rating</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .rg-auth {
      display: grid;
      grid-template-columns: 1fr 1fr;
      min-height: 100vh;
      @media (max-width: 768px) { grid-template-columns: 1fr; }
    }
    .rg-auth__panel {
      padding: 3rem 2.5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      max-width: 480px;
      margin: 0 auto;
      width: 100%;
    }
    .rg-auth__logo {
      display: flex; align-items: center; gap: 8px;
      font-family: var(--rg-font-head); font-weight: 900; font-size: 1.3rem;
      color: var(--rg-navy); text-decoration: none; margin-bottom: 2.5rem;
      .pink { color: var(--rg-pink); }
    }
    .rg-auth__logo-icon {
      width: 28px; height: 28px;
      background: var(--rg-gradient);
      border-radius: 50%;
    }
    .rg-auth__title { font-size: 1.8rem; color: var(--rg-navy); margin-bottom: .4rem; }
    .rg-auth__sub { font-size: 14px; color: #888; margin-bottom: 2rem; }
    .rg-auth__form {
      display: flex; flex-direction: column; gap: 1rem;
      mat-form-field { width: 100%; }
    }
    .rg-auth__error {
      background: rgba(240,62,110,.1);
      color: var(--rg-pink);
      padding: .75rem 1rem;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
    }
    .rg-auth__submit {
      width: 100%; justify-content: center; margin-top: .5rem;
    }
    .rg-auth__footer { font-size: 13px; color: #888; text-align: center; margin-top: 1.5rem; }
    .rg-auth__link { color: var(--rg-pink); font-weight: 700; text-decoration: none; }
    .rg-auth__visual {
      background: var(--rg-navy);
      display: flex; align-items: center; justify-content: center;
      position: relative; overflow: hidden;
      @media (max-width: 768px) { display: none; }
      &::before {
        content: '';
        position: absolute;
        top: -80px; right: -80px;
        width: 300px; height: 300px;
        background: rgba(247,164,39,.12);
        border-radius: 50%;
      }
    }
    .rg-auth__visual-content {
      text-align: center; padding: 2rem; position: relative; z-index: 1;
    }
    .rg-auth__quote {
      font-family: var(--rg-font-head);
      font-size: 1.4rem;
      font-weight: 800;
      color: #fff;
      margin-bottom: 2rem;
      line-height: 1.4;
    }
    .rg-auth__visual-stats {
      display: flex; gap: 2rem; justify-content: center;
      div { text-align: center; color: rgba(255,255,255,.6); font-size: 13px; font-weight: 600; }
      span { display: block; font-family: var(--rg-font-head); font-size: 1.4rem; font-weight: 900; color: var(--rg-orange); }
    }
  `]
})
export class LoginComponent {
  private fb   = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  loading = false;
  showPass = false;
  error = '';

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.error   = '';

    const { email, password } = this.form.value;
    this.auth.login(email!, password!).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => {
        this.error   = 'Credenciales incorrectas. Intenta de nuevo.';
        this.loading = false;
      }
    });
  }
}
