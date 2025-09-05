import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IWebsiteSetting } from '../model';

@Injectable({
  providedIn: 'root'
})
export class WebSettService {
  constructor(private _http:HttpClient) { }

  private apiUrl = 'http://localhost:3000'

  getWebsettings(){
    return this._http.get<IWebsiteSetting[]>(`${this.apiUrl}/web-sett`);
  }

  addWebsettings(formData:FormData){
    return this._http.post<IWebsiteSetting>(`${this.apiUrl}/web-sett`, formData);
  }
  updateWebsettings( id:string,formData:FormData){
    return this._http.put<IWebsiteSetting>(`${this.apiUrl}/web-sett/${id}`, formData);
  }
  
}
