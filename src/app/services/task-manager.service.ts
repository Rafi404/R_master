import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {
  readonly rootUrl = environment.rootUrl;
  _url: string;
  constructor(private _http: HttpClient) { }

  //POST Services=============================================================

  // Add Task
  onAddTask(data){
  return this._http.post<any>(this.rootUrl + '/post-task', data);
  }

  //Get Services=============================================================
//get Vehicle name list
onGetVehicleList(){
  return this._http.get<any>(this._url + '/get-vehiclename');
}
  }
