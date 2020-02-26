import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthserviceService } from './authservice.service';
import { Router } from '@angular/router';
import { MessageService } from 'app/services/message.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AuthserviceService, private router: Router, private message: MessageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.getJwtToken()) {
      request = this.addToken(request, this.authService.getJwtToken());
    }

    return next.handle(request).pipe(catchError(err => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        console.log(err.status);
        // this.router.navigate(['/auth']);
        return throwError('Unauthorized');
        // this.message.showNotification('danger', 'Authentication Failed');
        // return this.handle401Error(request, next);
      } else {
        return throwError(err);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    // if (!this.isRefreshing) {
    //   this.isRefreshing = true;
    //   this.refreshTokenSubject.next(null);

    //   return this.authService.refreshToken().pipe(
    //     switchMap((token: any) => {
    //       this.isRefreshing = false;
    //       this.refreshTokenSubject.next(token.jwt);
    //       return next.handle(this.addToken(request, token.jwt));
    //     }));

    // } else {
    //   return this.refreshTokenSubject.pipe(
    //     filter(token => token != null),
    //     take(1),
    //     switchMap(jwt => {
    //       return next.handle(this.addToken(request, jwt));
    //     }));
    // }
  }
}
