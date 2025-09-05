import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icontactus, IWebsiteSetting } from '../model';

@Injectable({
  providedIn: 'root'
})
export class ContactusServices {
  constructor(private _http:HttpClient) { }

  private apiUrl = 'http://localhost:3000'

  getAllMessages(){
    return this._http.get<Icontactus[]>(`${this.apiUrl}/contactus`);
  }

  createContactus( contact: Icontactus): Observable<Icontactus>{
    return this._http.post<Icontactus>(`${this.apiUrl}/contactus`, contact);
  }


  
}
