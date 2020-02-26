
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { catchError, mapTo, tap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Tokens } from '../models/tokens';
import { environment} from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  loggedUser: string;
  readonly rootUrl = environment.rootUrl;
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'JWT_TOKEN';
  constructor(private http: HttpClient) {
    console.log(this.rootUrl);
  }
  login(data) {
    return this.http.post<any>(this.rootUrl + `/specificLogin`, data)
      .pipe(map(user => {
        this.doLoginUser(user, user);
        return user;
      }));
  }

  private doLoginUser(user: any, token: Tokens) {
    this.loggedUser = user.userDetails.faculty_name;
    localStorage.clear();
    localStorage.setItem('username', user.userDetails.faculty_name);
    localStorage.setItem('user_name', user.username);
    localStorage.setItem('type', user.user_type);
    if(user.userDetails.dep_id ===102) {
      localStorage.setItem('is_valid', 'valid');
    }
    console.log(token);
    this.storeJwtToken(token);
  }
  private storeJwtToken(token: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, token.token);
  }
  // isLoggedIn() {
  //   return !!this.getJwtToken();
  // }
  isLoggedIn() {
    const user = localStorage.getItem('type');
    const valid = localStorage.getItem('is_valid');
    return !!this.getJwtToken() && user === '1' && valid ==='valid';
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
        tap(success => this.doLogoutUser()),
        mapTo(true),
        catchError(error => {
          this.doLogoutUser()
          // alert(error.error);
          return of(false);
        }));
  }
  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }
  removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    sessionStorage.clear();
    localStorage.removeItem('username');
    localStorage.removeItem('user_name');
    localStorage.removeItem('type');
    localStorage.removeItem('is_valid');
  
    // localStorage.removeItem(this.REFRESH_TOKEN);
  }
  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  getinstituteWeb(name) {
    return this.http.get<any>(this.rootUrl + '/getInstitute/' + name)
  }
  requestPasswordReset(data) {// new one for faculty
    return this.http.post<any>(this.rootUrl + '/password/faculty-reset-request', data)
  }
  validateResetToken(token) {
    return this.http.get<any>(this.rootUrl + '/password/find/' + token)
  }
  resetPassword(data) {
    return this.http.post<any>(this.rootUrl + '/password/faculty-reset', data)
  }



}
