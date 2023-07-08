import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Customer } from '../model/customer';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatTableModule, MatIconModule],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {

  title = 'Customer List';
  loading = true;
  customers: Customer[] = [];
  displayedColumns = ['id','firstName','lastName','actions'];
  feedback: any = {};

  constructor(private http: HttpClient) {
  }
  
  ngOnInit() {
    this.loading = true;
    this.http.get<Customer[]>('/api/customer').subscribe((data: Customer[]) => {
      this.customers = data;
      this.loading = false;
      this.feedback = {};
    });
  }

  delete(customer: Customer): void {
    if (confirm(`Are you sure you want to delete ${customer.firstName}?`)) {
      this.http.delete(`/api/customer/${customer.id}`).subscribe({
        next: () => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.ngOnInit();
          }, 1000);
        },
        error: () => {
          this.feedback = {type: 'warning', message: 'Error deleting.'};
        }
      });
    }
  }

  protected readonly event = event;

}
