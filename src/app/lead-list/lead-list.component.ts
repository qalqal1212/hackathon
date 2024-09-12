import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lead-list',
  templateUrl: './lead-list.component.html',
  styleUrls: ['./lead-list.component.scss']
})
export class LeadListComponent {

  constructor(private router: Router){}

  dataList = [
    {
      name: "Hello",
      id: "12345",
      contact: "012-5141477",
      date: "12/08/2024",
      status: "Active",
      brn: "1408874K"
    },
    {
      name: "World",
      id: "67890",
      contact: "014-5482147",
      date: "15/09/2024",
      status: "Pending",
      brn: "1408888K"
    }
  ];


  upArrowAccordion = "assets/images/icons/up-arrow-cherry.svg";
  downArrowAccordion = "assets/images/icons/down-arrow-cherry.svg";
  arrowImg = "assets/images/icons/right-arrow.svg";


  onNextButton(brn: string) {
    // if (this.myForm.valid) {
    //   console.log('Form Submitted!', this.myForm.value);
    // }
    this.router.navigate(['/leadHome', { brn: brn }]);
  }
}
