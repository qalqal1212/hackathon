import { Component, OnInit } from '@angular/core';
import { ChatbotService } from '../chatbot.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lead-page',
  templateUrl: './lead-page.component.html',
  styleUrls: ['./lead-page.component.scss'],
})
export class LeadPageComponent implements OnInit {
  sessionId: string | null = null;  // Initialize as null to handle undefined state
  brn: string = "";  // Get BRN from route parameters
  query: string = '';  // Holds the user input
  messages: { text: string; sender: string }[] = [];  // Chat messages array
  loading: boolean = false;  // Loading state for chat

  constructor(
    private chatbotService: ChatbotService, 
    private route: ActivatedRoute,
    private router: Router  // Inject Router to handle navigation
  ) {}

  ngOnInit(): void {
    // Retrieve the BRN from the route parameters
    this.route.params.subscribe(params => {
      this.brn = params['brn'];  // Get the BRN from the route
      console.log('Received BRN:', this.brn);

      // Check if sessionId is already available for this BRN
      const savedSessionId = this.chatbotService.getSessionId(this.brn);
      if (savedSessionId) {
        this.sessionId = savedSessionId;
        console.log('Reusing sessionId:', this.sessionId);
      }
    });
  }

  // Method triggered when clicking on the chatbox image to get the sessionId
  onChatboxImageClick(): void {
    if (!this.sessionId) {
      // Only call API to get sessionId if not already available
      this.chatbotService.sendBrn(this.brn).subscribe((response) => {
        this.sessionId = response.session_id;
        if (this.sessionId) {
          this.chatbotService.saveSessionId(this.brn, this.sessionId);  // Save sessionId for reuse
          console.log('New sessionId:', this.sessionId);
        }
      });
    }
  }

  // Send message to the chatbot
  sendMessage(): void {
    if (this.sessionId && this.query) {
      this.scrollToBottom();  // Auto-scroll to the bottom of the chat
      this.loading = true;  // Show loader while waiting for a response

      // Add user's message to the chat
      this.messages.push({ text: this.query, sender: 'user' });

      this.chatbotService.askQuery(this.sessionId, this.query).subscribe(
        (response) => {
          const responseMessage = response[Object.keys(response)[0]];  // Get bot's response
          this.messages.push({ text: responseMessage, sender: 'bot' });
          this.query = '';  // Clear the input after sending the message
          this.loading = false;  // Hide loader after receiving the response
          this.scrollToBottom();  // Auto-scroll to the bottom
        },
        (error) => {
          console.error('Error:', error);
          this.loading = false;  // Hide loader if an error occurs
        }
      );
    }
  }

  // Send predefined bubble query
  sendBubbleQuery(bubbleType: string): void {
    this.scrollToBottom();  // Auto-scroll to the bottom
    this.loading = true;  // Show loader

    if (this.sessionId && bubbleType) {
      // Add user's message to the chat
      this.messages.push({ text: bubbleType, sender: 'user' });

      this.chatbotService.bubbleQuery(this.sessionId, bubbleType).subscribe(
        (response: any) => {
          const responseMessage = response[Object.keys(response)[0]];  // Get bot's response
          this.messages.push({ text: responseMessage, sender: 'bot' });
          this.query = '';  // Clear the input
          this.loading = false;  // Hide loader
          this.scrollToBottom();  // Auto-scroll to the bottom
        },
        (error) => {
          console.error('Error:', error);
          this.loading = false;  // Hide loader on error
        }
      );
    }
  }

  // Navigate back to the lead list
  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  // Scroll to the bottom of the chatbox
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
