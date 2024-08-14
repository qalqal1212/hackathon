import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  myForm: FormGroup;
  title = 'hackathon-app';

  constructor(private router: Router) {
    this.myForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    // if (this.myForm.valid) {
    //   console.log('Form Submitted!', this.myForm.value);
    // }
    this.router.navigate(['/dashboard']);
  }
}
