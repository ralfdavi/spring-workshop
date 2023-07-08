import { Component } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Customer } from './model/customer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CRUD';
  loading = true;
  customers: Customer[] = [];

  constructor(private http: HttpClient) {
  }
}
