import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lead-page',
  templateUrl: './lead-page.component.html',
  styleUrls: ['./lead-page.component.scss']
})
export class LeadPageComponent {
  userInput: string = '';
  initialTopics: string[] = ['Products', 'Documents', 'Credit Score', 'Directors', 'Status'];
  topics: string[] = [...this.initialTopics]; 
  messages: string[] = [];
  isChatboxOpen = false; // Controls the chatbox visibility

  constructor(private router: Router){}

  closeChatbox(): void {
    // Logic to close the chatbox
    console.log('Chatbox closed');
  }

  toggleChatbox() {
    this.isChatboxOpen = !this.isChatboxOpen;
  }

  selectTopic(topic: string): void {
    if (topic === 'Back to Main Menu') {
      this.goToMainMenu(); // Reset to main menu
    } else if (this.isSecondLevelTopic(topic)) {
      this.displayResult(topic); // Display detailed result
    } else {
      this.updateTopics(topic); // Show subtopics
    }
  }
  

  sendMessage(): void {
    if (this.userInput.trim()) {
      // Logic to handle sending the message
      this.messages.push(`User: ${this.userInput}`);
      this.generateResponse(this.userInput);
      this.userInput = ''; // Clear the input field after sending
      console.log(`Message sent: ${this.userInput}`);
    }
  }

  generateResponse(input: string): void {
    let response: string;

    switch (input) {
      case 'Products':
        response = 'Here are our product offerings: [List of Products]';
        break;
      case 'Documents':
        response = 'You need the following documents: [List of Documents]';
        break;
      case 'Credit Score':
        response = 'Your credit score can be checked via: [Credit Score Link]';
        break;
      case 'Directors':
        response = 'Here is the list of directors: [List of Directors]';
        break;
      case 'Status':
        response = 'Check the status of your application here: [Status Link]';
        break;
      default:
        response = 'Sorry, I didn’t understand that. Can you please rephrase?';
    }

    this.messages.push(`Bot: ${response}`);
  }

  updateTopics(topic: string): void {
    switch (topic) {
      case 'Products':
        this.topics = ['Loans', 'Credit Cards', 'Insurance'];
        this.messages.push('Please choose a product category:');
        break;
      case 'Documents':
        this.topics = ['Personal Documents', 'Business Documents'];
        this.messages.push('Please choose a document type:');
        break;
      case 'Credit Score':
        this.topics = ['Check Credit Score', 'Improve Credit Score'];
        this.messages.push('Please choose an option related to your credit score:');
        break;
      case 'Directors':
        this.topics = ['Board of Directors', 'Executive Team'];
        this.messages.push('Please choose a category of directors:');
        break;
      case 'Status':
        this.topics = ['Application Status', 'Approval Status'];
        this.messages.push('Please choose the status you want to check:');
        break;
      default:
        this.topics = this.topics = [...this.initialTopics]; // Reset to initial topics
    }
  }

  isSecondLevelTopic(topic: string): boolean {
    const secondLevelTopics = [
      'Loans', 'Credit Cards', 'Insurance',
      'Personal Documents', 'Business Documents',
      'Check Credit Score', 'Improve Credit Score',
      'Board of Directors', 'Executive Team',
      'Application Status', 'Approval Status'
    ];
    return secondLevelTopics.includes(topic);
  }

  displayResult(topic: string): void {
    let result: string;

    switch (topic) {
      case 'Loans':
        result = 'Here are the loan options: [Loan Details]';
        break;
      case 'Credit Cards':
        result = 'Here are the credit card options: [Credit Card Details]';
        break;
      case 'Insurance':
        result = 'Here are the insurance options: [Insurance Details]';
        break;
      case 'Personal Documents':
        result = 'Here is the list of personal documents: [Personal Documents Details]';
        break;
      case 'Business Documents':
        result = 'Here is the list of business documents: [Business Documents Details]';
        break;
      case 'Check Credit Score':
        result = 'Here’s how you can check your credit score: [Credit Score Details]';
        break;
      case 'Improve Credit Score':
        result = 'Here’s how you can improve your credit score: [Improvement Tips]';
        break;
      case 'Board of Directors':
        result = 'Here is the board of directors: [Board of Directors Details]';
        break;
      case 'Executive Team':
        result = 'Here is the executive team: [Executive Team Details]';
        break;
      case 'Application Status':
        result = 'Here is the status of your application: [Application Status Details]';
        break;
      case 'Approval Status':
        result = 'Here is the status of your approval: [Approval Status Details]';
        break;
      default:
        result = 'No information available.';
    }

    this.messages.push(`Bot: ${result}`);
    this.topics = []; // Clear topics after displaying the result

    // Add the "Back" option to return to the first menu
    this.topics.push('Back to Main Menu');
  }

  goToMainMenu(): void {
    this.topics = [...this.initialTopics]; // Reset topics to the initial menu
    this.messages.push('Returning to the main menu...');
    this.messages.push('Bot: You are back at the main menu. Please select a topic.');
    this.messages = []; // Clear the message history
    
  }

  onBack() {
    this.router.navigate(['/dashboard']);
  }
}
