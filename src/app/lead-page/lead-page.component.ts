import { Component, OnInit } from '@angular/core';
import { ChatbotService } from '../chatbot.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lead-page',
  templateUrl: './lead-page.component.html',
  styleUrls: ['./lead-page.component.scss'],
})
export class LeadPageComponent implements OnInit{
  sessionId: string | null = null;
  brn = "";
  query = '';
  messages: { text: string; sender: string }[] = [];
  loading: boolean = false; // New loading state

  constructor(private chatbotService: ChatbotService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Retrieve the BRN from the route parameters
    this.route.params.subscribe(params => {
      this.brn = params['brn'];  // Get the hardcoded BRN number from the route
      console.log('Received BRN:', this.brn);
    });
  }

  onChatboxImageClick(): void {
    // Trigger the first API to get the session ID
    this.chatbotService.sendBrn(this.brn).subscribe((response) => {
      this.sessionId = response.session_id;
    });
  }

  sendMessage(): void {
    if (this.sessionId && this.query) {
      this.scrollToBottom(); // Auto-scroll to the bottom
      this.loading = true; // Show loader before sending the request

      this.chatbotService.askQuery(this.sessionId, this.query).subscribe(
        (response) => {
          const responseMessage = response[Object.keys(response)[0]]; // Get the dynamic session key
          this.messages.push({ text: this.query, sender: 'user' });
          this.messages.push({ text: responseMessage, sender: 'bot' });
          this.query = ''; // Clear the input after sending the message
          this.loading = false; // Hide loader after receiving response

          this.scrollToBottom(); // Auto-scroll to the bottom
        },
        (error) => {
          console.error('Error:', error);
          this.loading = false; // Hide loader in case of error
        }
      );
    }
  }

  // Function to send hardcoded "redflags" query
  sendBubbleQuery(bubbleType: string): void {
    this.loading = true;
  
    if (this.sessionId && bubbleType) {
      // Add user's message to the chat
      this.messages.push({ text: bubbleType, sender: 'user' });
  
      this.chatbotService.bubbleQuery(this.sessionId, bubbleType).subscribe(
        (response: any) => {
          const responseMessage = response[Object.keys(response)[0]]; // Get the dynamic session key
          this.messages.push({ text: responseMessage, sender: 'bot' });
          this.query = ''; // Clear the input after sending the message
          this.loading = false;

          this.scrollToBottom(); // Auto-scroll to the bottom
        },
        (error) => {
          console.error('Error:', error);
          this.loading = false;
        }
      );
    }
  }

  // Scroll to bottom function
  private scrollToBottom(): void {
    setTimeout(() => {
      const chatboxBody = document.getElementById('chatboxBody');
      chatboxBody?.scrollTo({
        top: chatboxBody.scrollHeight,
        behavior: 'smooth'
      });
    }, 0);
  }
}
