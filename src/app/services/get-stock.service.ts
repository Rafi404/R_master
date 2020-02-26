import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetStockService {
  _url= 'http://127.0.0.1:8000/api';

  constructor(private _http: HttpClient) { }

  getStock(){
    return this._http.get<any>(this._url+'/getStockData');
  }
}
