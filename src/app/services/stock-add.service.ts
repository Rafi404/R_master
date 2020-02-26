import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockAddService {

  _url= 'http://127.0.0.1:8000/api';
  constructor(private _http: HttpClient) { }
  registerStock(data){

    return this._http.post<any>(this._url + '/add_purchase', data);
 
   }
}
