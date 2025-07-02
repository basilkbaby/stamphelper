import { Component } from '@angular/core';
import { PostalService, StampService } from '../services/stamp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mailType: string = 'letter';
  serviceType: string = '1st-class';
  weight: number = 100;
  showResult: boolean = true;
  currentYear: number = new Date().getFullYear();
  postalServices: PostalService[] = [];
  result: any = {
    stampCount: 1,
    totalCost: "£1.10",
    stamps: ["1st"]
  };

  constructor(private stampService: StampService) { }

  ngOnInit(): void {
    this.postalServices = this.stampService.getPostalServices();
  }

  calculateStamps(): void {
    this.result = this.stampService.calculateStamps(
      this.mailType,
      this.serviceType,
      this.weight
    );
    this.showResult = true;
  }
}