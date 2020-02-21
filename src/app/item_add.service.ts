import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemAddService {

  _url= 'http://127.0.0.1:8000/api';
  constructor(private _http:HttpClient) { }

  register(item_Data){
    return this._http.post<any>(this._url + '/add_item',item_Data);
  }
}
