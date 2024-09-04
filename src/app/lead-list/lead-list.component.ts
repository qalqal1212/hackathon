import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lead-list',
  templateUrl: './lead-list.component.html',
  styleUrls: ['./lead-list.component.scss']
})
export class LeadListComponent {

  constructor(private router: Router){}


  upArrowAccordion = "assets/images/icons/up-arrow-cherry.svg";
  downArrowAccordion = "assets/images/icons/down-arrow-cherry.svg";
  arrowImg = "assets/images/icons/right-arrow.svg";


  onNextButton() {
    // if (this.myForm.valid) {
    //   console.log('Form Submitted!', this.myForm.value);
    // }
    this.router.navigate(['/leadHome']);
  }
}
