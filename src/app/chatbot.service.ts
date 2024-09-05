// chatbot.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private sendBrnUrl = 'http://127.0.0.1:8181/send-brn';
  private askMeUrl = 'http://127.0.0.1:8181/askMe';

  constructor(private http: HttpClient) {}

  sendBrn(): Observable<any> {
    const body = { brn: '1408874K' };
    return this.http.post(this.sendBrnUrl, body);
  }

  askQuery(sessionId: string, query: string): Observable<any> {
    const body = {
      query,
      session_id: sessionId
    };
    return this.http.post(this.askMeUrl, body);
  }
}
