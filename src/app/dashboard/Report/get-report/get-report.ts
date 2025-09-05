import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../../core/services/order-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-report',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './get-report.html',
  styleUrl: './get-report.css'
})
export class GetReport implements OnInit {
  report: any = {};
  reportForm = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl('')
  });

  constructor(private purchaseService: OrderService) {}

  ngOnInit(): void {}

  getReport() {
    const { startDate, endDate } = this.reportForm.value;
    this.purchaseService.getSalesReport(startDate!, endDate!).subscribe({
      next: (res) => {
        this.report = res.data[0]; // because it's wrapped in an array
        console.log("Report:", this.report);
      },
      error: (err) => {
        console.error("Failed to fetch report", err);
      }
    });
  }
}

