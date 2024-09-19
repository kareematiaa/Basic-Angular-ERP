import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Task1';

  /**
   *
   */
  constructor(private http: HttpClient) {}
  apiUrl = 'https://localhost:44330/Order/GetAllCustomers';

  fetchData() {
    this.http.get(this.apiUrl).subscribe((data) => {
      console.log('Data fetched:', data);
    });
  }
}
