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

    // Add Task
    onAddDuty(data){
      return this._http.post<any>(this.rootUrl + '/post-duty', data);
      }

  //Get Services=============================================================
//get staff list
onGetStaff(){
  return this._http.get<any>(this.rootUrl + '/select-staff');
}
//get task list
onGetTaskList(key){
  return this._http.get<any>(this.rootUrl + '/tasksearch/' + key);
}
//get Live project list
onGetLiveProject(){
  return this._http.get<any>(this.rootUrl + '/get-active-project');
}

//get Task list to table
onGetTask(){
  return this._http.get<any>(this.rootUrl + '/get-task');        
}

//get Duty list to table
onGetDutyList(){
  return this._http.get<any>(this.rootUrl + '/get-duty'); 
  }
}