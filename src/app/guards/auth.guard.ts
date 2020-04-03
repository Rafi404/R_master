import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthserviceService } from 'app/auth/authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthserviceService, private router: Router) { }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      // this.router.navigate(['/stock-pur']);
    }
    return !this.authService.isLoggedIn();
  }
}
