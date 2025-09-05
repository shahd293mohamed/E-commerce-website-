import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICartResponse } from '../model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private _http:HttpClient) { }
  private apiUrl = 'http://localhost:3000' 

  addToCart(productId: string, quantity: number, price: number) {
    return this._http.post(`${this.apiUrl}/cart/add`, { productId, quantity, price });
  }

getCart(): Observable<ICartResponse> {
  return this._http.get<ICartResponse>(`${this.apiUrl}/cart`);
}
removeFromCart(productId: string) {
  return this._http.request('delete', `${this.apiUrl}/cart/remove`, {
    body: { productId }
  });
}


  
}
