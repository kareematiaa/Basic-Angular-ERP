import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from './Order';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  private customerApi = 'https://localhost:44330/Order/GetAllCustomers';
  private productApi = 'https://localhost:44330/Order/GetAllProducts';
  private customerIdApi = 'https://localhost:44330/Order/product';
  private productIdApi = 'https://localhost:44330/Order';
  private orderApi = 'https://localhost:44330/Order';

  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<any[]> {
    return this.http.get<any[]>(this.customerApi);
  }
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.productApi);
  }
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.customerIdApi}/${id}`);
  }
  getCustomerById(id: number): Observable<any> {
    return this.http.get<any>(`${this.productIdApi}/${id}`);
  }

  submitOrder(order: Order) {
    return this.http.post<any>(this.orderApi, order);
  }
}
