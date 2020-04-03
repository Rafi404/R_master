import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  readonly rootUrl = environment.rootUrl;
  _url: string;
  constructor(private _http: HttpClient) { }

//POST Services=============================================================
  // Add Vehicle
  onAddVehicle(data){
    return this._http.post<any>(this.rootUrl + '/add-vehicle', data);
  }
//Add stations
onAddStation(data){
  return this._http.post<any>(this.rootUrl + '/add-station', data);
}
//Get Services=============================================================
//get Vehicle name list
onGetVehicleList(){
  return this._http.get<any>(this._url + '/get-vehiclename');
}
onGetStationsList(){
  return this._http.get<any>(this._url + '/get-station');
}
}


