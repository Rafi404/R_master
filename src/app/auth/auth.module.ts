import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, } from '@angular/common/http';
import { RouterModule } from '@angular/router';
// import { AuthComponent } from './auth.component';
import { AuthserviceService } from './authservice.service';
import { RandomGuard } from 'app/guards/random.guard';
import { AuthGuard } from 'app/guards/auth.guard';


@NgModule({
  // declarations: [AuthComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [
    AuthserviceService,
    AuthModule,
    RandomGuard,
    AuthGuard,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true
    // }
  ],
})
export class AuthModule { }
