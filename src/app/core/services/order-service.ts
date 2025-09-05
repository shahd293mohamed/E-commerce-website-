import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private _http:HttpClient) { }
  private apiUrl = 'http://localhost:3000'


  createOrder(): Observable<any> {
    return this._http.post(`${this.apiUrl}/order`, {}); 
    // backend extracts user from token, so no need to send userId
  }

  getOrders(): Observable<any> {
    return this._http.get(`${this.apiUrl}/order`);
  }

  getOrderById(id: string): Observable<any> {
    return this._http.get(`${this.apiUrl}/order/${id}`);
  }

  updateOrder(id: string, body: any): Observable<any> {
    return this._http.put(`${this.apiUrl}/order/${id}`, body);
  }
  getSalesReport(startDate: string, endDate: string): Observable<any> {
  return this._http.get(`${this.apiUrl}/order/report`, {
    params: { startDate, endDate }
  });
}
getorderByUserId(id: string): Observable<any> {
  return this._http.get(`${this.apiUrl}/order/user/${id}`);
}

  
}
