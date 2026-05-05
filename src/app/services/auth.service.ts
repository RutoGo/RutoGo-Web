import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../core/models/trip.model';

interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'rg_token';
  private readonly USER_KEY = 'rg_user';

  private _user = signal<User | null>(this.loadUser());
  private _token = signal<string | null>(this.loadToken());

  readonly user = this._user.asReadonly();
  readonly token = this._token.asReadonly();
  readonly isLoggedIn = computed(() => !!this._token());
  readonly isDriver = computed(() => ['driver', 'both'].includes(this._user()?.role ?? ''));

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.API_BASE_URL}/auth/login`, { email, password })
      .pipe(
        tap(res => this.saveSession(res.token, res.user)),
        catchError(err => throwError(() => err))
      );
  }

  register(data: Partial<User> & { password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.API_BASE_URL}/auth/register`, data)
      .pipe(
        tap(res => this.saveSession(res.token, res.user)),
        catchError(err => throwError(() => err))
      );
  }

  getProfile() {
    return this.http.get<User>(`${environment.API_BASE_URL}/auth/me`);
  }

  updateProfile(payload: Partial<User>) {
    return this.http.put<User>(`${environment.API_BASE_URL}/auth/me`, payload)
      .pipe(tap(user => this.saveSession(this._token() ?? '', user)));
  }

  changePassword(currentPassword: string, newPassword: string) {
    return this.http.post<void>(`${environment.API_BASE_URL}/auth/change-password`, {
      currentPassword,
      newPassword
    });
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this._token.set(null);
    this._user.set(null);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return this._token();
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
