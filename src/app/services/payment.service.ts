import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface PaymentData {
  method: 'card' | 'paypal' | 'transfer';
  amount: number;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  payerName?: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class PaymentService {
  constructor(private http: HttpClient) {}

  processPayment(bookingId: string, paymentData: PaymentData): Observable<PaymentResponse> {
    return this.http.post<PaymentResponse>(
      `${environment.API_BASE_URL}/bookings/${bookingId}/payment`,
      paymentData
    );
  }
}
