import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IproductRes, IproductsRes } from '../model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsServices {
  constructor(private _http:HttpClient) { }

  private apiUrl = 'http://localhost:3000'

  // getProducts(sortBy: string = 'createdAt', order: string = 'desc'): Observable<IproductsRes> {
  //   return this._http.get<IproductsRes>(`${this.apiUrl}/products`);
  // }

  getProducts(sortBy: string = 'createdAt', order: string = 'desc'): Observable<IproductsRes> {
    const params = new HttpParams()
      .set('sortBy', sortBy)
      .set('order', order);

    return this._http.get<IproductsRes>(`${this.apiUrl}/products`, { params });
  }



  getProductRoute(route: string): Observable<IproductRes> {
    return this._http.get<IproductRes>(`${this.apiUrl}/products/${route}`);
  }

  getProductsByCategory(categoryName: string, subCategory?: string) {
  let url = `${this.apiUrl}/products/categories?categoryName=${categoryName}`;
  if (subCategory) {
    url += `&subCategory=${subCategory}`;
  }
  return this._http.get<IproductsRes>(url);
}

addProduct(product: any) {
  return this._http.post(`${this.apiUrl}/products`, product);
  
  
}
updateProduct(id: string, product: any) {
  return this._http.put(`${this.apiUrl}/products/update/${id}`, product);
}


}
