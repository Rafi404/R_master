import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetStockService {
  _url = 'http://127.0.0.1:8000/api';

  constructor(private _http: HttpClient) { }

  getStock() {
    return this._http.get<any>(this._url + '/getSubsidiaryStock');
  }
  getitems() {
    return this._http.get<any>(this._url + '/get-items');
  }
  onGetUsageReport(from_date, to_date) {
    return this._http.get<any>(this._url + '/get-usage-report/' + from_date + '/' + to_date);
  }
  onGetSupplier(){
    return this._http.get<any>(this._url + '/getSupplierdata');
  }
  onGetItemGroup(){
    return this._http.get<any>(this._url + '/get-item-groups');
  }
  onGetItemBrand(){
    return this._http.get<any>(this._url + '/get-item-brands');
  }
  onGetItemUnits(){
    return this._http.get<any>(this._url + '/get-item-units');
  }
  onGetIndividualItem(item_id){
    return this._http.get<any>(this._url + '/get-item-usage/' + item_id);
  }
onGetSubsidiaryStock(){
  return this._http.get<any>(this._url + '/getSubsidiaryStock');
}
onGetBatch(){
  return this._http.get<any>(this._url + '/batch-list');
}
  //==========================================================================

  onAddUsage(data){
    return this._http.post<any>(this._url + '/add-usage', data);
  }

  onIssueApparatus(data){
    return this._http.post<any>(this._url + '/issue-apparatus', data);
  }

}

