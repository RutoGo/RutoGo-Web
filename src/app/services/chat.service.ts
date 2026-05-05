import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

export interface ChatMessage {
  id: string;
  tripId: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private socket?: WebSocketSubject<ChatMessage>;

  constructor(private auth: AuthService) {}

  connectChat(tripId: string): WebSocketSubject<ChatMessage> {
    const token = this.auth.getToken();
    if (!token) {
      throw new Error('No JWT token available for chat connection');
    }

    const baseWs = environment.API_BASE_URL.replace(/^http/, 'ws').replace(/\/+$|\/$/, '');
    const wsUrl = `${baseWs}/chat/${tripId}/ws?token=${encodeURIComponent(token)}`;

    this.socket = webSocket<ChatMessage>({
      url: wsUrl,
      deserializer: msg => JSON.parse(msg.data),
      serializer: msg => JSON.stringify(msg),
      openObserver: {
        next: () => console.log('Chat WS conectado', wsUrl)
      },
      closeObserver: {
        next: () => console.log('Chat WS cerrado')
      }
    });

    return this.socket;
  }

  sendMessage(message: { tripId: string; text: string }): void {
    this.socket?.next(message as ChatMessage);
  }

  disconnect(): void {
    this.socket?.complete();
    this.socket = undefined;
  }
}
