import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Icategory } from '../model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private _http:HttpClient) { }
  private apiUrl = 'http://localhost:3000';


  getCategories(){
    return this._http.get<Icategory[]>(`${this.apiUrl}/category`);
  }

getCategoriesTree() {
  return this._http.get<any>(`${this.apiUrl}/category/tree`);
}

  addCategory(category: Icategory): Observable<Icategory> {
    return this._http.post<Icategory>(`${this.apiUrl}/category`, category);
  }


  
}
