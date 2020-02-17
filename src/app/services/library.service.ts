import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private loggedUser: string;
  readonly rootUrl = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) { }
  addBooks(data) {
     return this.http.post<any>(this.rootUrl + `/books`, data)
  }
  addAuthor(data) {
     return this.http.post<any>(this.rootUrl + '/addAuthor', data)
  }
  getAuthor() {
    return this.http.get<any>(this.rootUrl + '/getAuthor')
  }
  isIssued(id) {
    return this.http.get<any>(this.rootUrl + '/isIssued/' + id)
  }
  issueBook(data) {
    return this.http.post<any>(this.rootUrl + '/issueBook', data)
  }
  returnBook(id) {
    return this.http.patch<any>(this.rootUrl + '/collectBook', {'id': id})
  }
  getStudent(id) {
    return this.http.get<any>(this.rootUrl + '/getStudent/' + id)
  }
  getStaff(id) {
    return this.http.get<any>(this.rootUrl + '/getStaff/' + id )
  }
  getHistory(id) {
    return this.http.get<any>(this.rootUrl + '/getHistory/' + id)
  }
  getTransactions() {
    return this.http.get<any>(this.rootUrl + '/getTransactions')
  }
  getStatistics() {
    return this.http.get<any>(this.rootUrl + '/getStatistics')
  }
  getDepTransactions() {
    return this.http.get<any>(this.rootUrl + '/getDepTransactions')
  }
  getBookProperties() {
    return this.http.get<any>(this.rootUrl + '/getBookProperties')
  }

}
