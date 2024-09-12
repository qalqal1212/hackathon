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
  private bubbleUrl = 'http://127.0.0.1:8181/bubble';

  constructor(private http: HttpClient) {}

  sendBrn(brn: string): Observable<any> {
    const body = { brn };
    return this.http.post(this.sendBrnUrl, body);
  }

  askQuery(sessionId: string, query: string): Observable<any> {
    const body = {
      query,
      session_id: sessionId
    };
    return this.http.post(this.askMeUrl, body);
  }

  bubbleQuery(sessionId: string, query: string) : Observable<any> {
    const body = {
      query: "redflags",
      session_id: sessionId
    };
    return this.http.post(this.bubbleUrl, body)
  }
}
