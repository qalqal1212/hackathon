// chatbot.component.ts
import { Component } from '@angular/core';
import { ChatbotService } from '../chatbot.service'; 

@Component({
  selector: 'app-lead-page',
  templateUrl: './lead-page.component.html',
  styleUrls: ['./lead-page.component.scss']
})
export class LeadPageComponent {
  sessionId: string | null = null;
  query = '';
  messages: { text: string, sender: string }[] = [];
  loading: boolean = false;  // New loading state

  constructor(private chatbotService: ChatbotService) {}

  onChatboxImageClick(): void {
    // Trigger the first API to get the session ID
    this.chatbotService.sendBrn().subscribe(response => {
      this.sessionId = response.session_id;
    });
  }

  sendMessage(): void {
    if (this.sessionId && this.query) {
      this.loading = true;  // Show loader before sending the request

      this.chatbotService.askQuery(this.sessionId, this.query).subscribe(response => {
        const responseMessage = response[Object.keys(response)[0]]; // Get the dynamic session key
        this.messages.push({ text: this.query, sender: 'user' });
        this.messages.push({ text: responseMessage, sender: 'bot' });
        this.query = '';  // Clear the input after sending the message
        this.loading = false;  // Hide loader after receiving response
      }, error => {
        console.error('Error:', error);
        this.loading = false;  // Hide loader in case of error
      });
    }
  }
}
