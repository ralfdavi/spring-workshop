import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { Customer } from '../model/customer';
import { HttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-customer-edit',
  standalone: true,
  imports: [CommonModule, MatInputModule, FormsModule, MatButtonModule, RouterLink,
    MatDatepickerModule, MatIconModule, MatNativeDateModule, MatTooltipModule],
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent {

  customer!: Customer;
  feedback: any = {};

  constructor(private route: ActivatedRoute, private router: Router,
    private http: HttpClient) {
  }

  ngOnInit() {
    this.route.params.pipe(
      map(p => p['id']),
      switchMap(id => {
        if (id === 'new') {
          return of(new Customer());
        }
        return this.http.get<Customer>(`/api/customer/${id}`);
      })
    ).subscribe({
      next: customer => {
        this.customer = customer;
        this.feedback = {};
      },
      error: () => {
        this.feedback = { type: 'warning', message: 'Error loading' };
      }
    });
  }

  save() {
    const id = this.customer.id;
    const method = id ? 'put' : 'post';

    this.http[method]<Customer>('/api/customer', this.customer).subscribe({
      next: () => {
        this.feedback = { type: 'success', message: 'Save was successful!' };
        setTimeout(async () => {
          await this.router.navigate(['/customers']);
        }, 1000);
      },
      error: () => {
        this.feedback = { type: 'error', message: 'Error saving' };
      }
    });
  }

  async cancel() {
    await this.router.navigate(['/customers']);
  }

}
