
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mapTo, tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {Tokens} from '../models/tokens';
import { Book } from 'app/models/book';
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  loggedUser: string;
  readonly rootUrl = 'https://qa.embase.in/backend/api';
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'JWT_TOKEN';
  constructor(private http: HttpClient) { }
  login(data) {
    return this.http.post<any>(this.rootUrl + `/specificLogin`, data)
    .pipe(
     map(token =>{
       this.doLoginUser(data.email,token);
       return token;
     })

    )
      // .pipe(
      //   tap(token =>{
      //     console.log(token);
      //      this.doLoginUser(data.email, token)
          
      //     }),
      //   mapTo(true),
      //   catchError(error => {
      //     // throwError(error)
      //     return of(false);
      //   }));
  }

  private doLoginUser(username: string, token: Tokens) {
    this.loggedUser = username;
    sessionStorage.setItem('username', username);
    console.log(token);
    this.storeJwtToken(token);
  }
  private storeJwtToken(token: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, token.token);
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.http.post<any>(`${this.rootUrl}/refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: any) => {
      this.storeJwtToken(tokens.jwt);
    }));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }
  logout() {
    return this.http.get<any>(`${this.rootUrl}/logout`)
      .pipe(
      tap(success => this.doLogoutUser(success)),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
    }
    private doLogoutUser(success) {
      this.loggedUser = null;
      this.removeTokens();
    }
    removeTokens() {
      localStorage.removeItem(this.JWT_TOKEN);
      sessionStorage.clear();
      // localStorage.removeItem(this.REFRESH_TOKEN);
    }
  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

   getBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(`${this.rootUrl}/books`)
        }






}
