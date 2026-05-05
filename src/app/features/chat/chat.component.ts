import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ChatService, ChatMessage } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="rg-chat-shell">
      <header class="rg-chat-header">
        <h2>Chat del viaje</h2>
        <p>Comunícate en tiempo real con el conductor y otros pasajeros.</p>
      </header>

      <div class="rg-chat-messages">
        <article *ngFor="let message of messages" class="rg-chat-message" [class.rg-chat-own]="message.userId === currentUserId">
          <div class="rg-chat-message__meta">
            <strong>{{ message.userName }}</strong>
            <span>{{ message.createdAt | date:'shortTime' }}</span>
          </div>
          <p>{{ message.text }}</p>
        </article>
      </div>

      <form [formGroup]="chatForm" (ngSubmit)="sendMessage()" class="rg-chat-form">
        <mat-form-field appearance="outline" class="rg-chat-input">
          <input matInput placeholder="Escribe un mensaje" formControlName="text" />
        </mat-form-field>
        <button mat-flat-button color="primary" type="submit" [disabled]="chatForm.invalid">Enviar</button>
      </form>
    </div>
  `,
  styles: [
    `.rg-chat-shell { padding: 1.5rem; max-width: 940px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem; }
     .rg-chat-header h2 { margin: 0; }
     .rg-chat-header p { margin: .25rem 0 0; color: #606060; }
     .rg-chat-messages { display: grid; gap: .75rem; max-height: 55vh; overflow-y: auto; padding-right: .5rem; }
     .rg-chat-message { border-radius: 18px; padding: 1rem; background: #f5f7fb; }
     .rg-chat-own { background: #d8f1ff; align-self: flex-end; }
     .rg-chat-message__meta { display: flex; justify-content: space-between; gap: .5rem; font-size: .85rem; color: #6b6b6b; margin-bottom: .5rem; }
     .rg-chat-form { display: grid; grid-template-columns: 1fr auto; gap: .75rem; align-items: center; }
     .rg-chat-input { width: 100%; }
     @media (max-width: 720px) { .rg-chat-form { grid-template-columns: 1fr; } }
    `
  ]
})
export class ChatComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private chatService = inject(ChatService);

  chatForm = this.fb.group({ text: ['', Validators.required] });
  messages: ChatMessage[] = [];
  currentUserId = '';
  private subscription?: Subscription;

  ngOnInit(): void {
    const tripId = this.route.snapshot.paramMap.get('tripId');
    if (!tripId) {
      return;
    }

    this.currentUserId = ''; // Opcional: asignar desde AuthService si se desea
    const socket = this.chatService.connectChat(tripId);
    this.subscription = socket.subscribe({
      next: message => this.messages.push(message),
      error: error => console.error('Error WS chat', error)
    });
  }

  sendMessage(): void {
    if (this.chatForm.invalid) {
      return;
    }

    const text = this.chatForm.value.text?.trim();
    if (!text) {
      return;
    }

    const tripId = this.route.snapshot.paramMap.get('tripId');
    if (!tripId) {
      return;
    }

    this.chatService.sendMessage({ tripId, text });
    this.chatForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.chatService.disconnect();
  }
}
