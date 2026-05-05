import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { User } from '../models/trip.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'rg_token';
  private readonly USER_KEY  = 'rg_user';

  // Signals for reactive state
  private _user  = signal<User | null>(this.loadUser());
  private _token = signal<string | null>(this.loadToken());

  readonly user        = this._user.asReadonly();
  readonly token       = this._token.asReadonly();
  readonly isLoggedIn  = computed(() => !!this._token());
  readonly isDriver    = computed(() => this._user()?.role === 'driver' || this._user()?.role === 'both');

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<{ token: string; user: User }> {
    return this.http.post<{ token: string; user: User }>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap(res => this.saveSession(res.token, res.user)),
        catchError(err => throwError(() => err))
      );
  }

  register(data: Partial<User> & { password: string }): Observable<{ token: string; user: User }> {
    return this.http.post<{ token: string; user: User }>(`${environment.apiUrl}/auth/register`, data)
      .pipe(
        tap(res => this.saveSession(res.token, res.user)),
        catchError(err => throwError(() => err))
      );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this._token.set(null);
    this._user.set(null);
    this.router.navigate(['/']);
  }

  private saveSession(token: string, user: User): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this._token.set(token);
    this._user.set(user);
  }

  private loadToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private loadUser(): User | null {
    const raw = localStorage.getItem(this.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}
