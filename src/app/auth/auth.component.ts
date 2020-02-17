import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from './authservice.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'app/services/message.service';
import { error } from '@angular/compiler/src/util';
import { first } from 'rxjs/operators';
// import * as jQuery from 'jquery';
declare var $: any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginform: FormGroup;
  submitted = false;
  loginfailed = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authservice: AuthserviceService,
     private message: MessageService) { }

  ngOnInit() {
    this.loginform = this.formBuilder.group({
      userid: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      user_type: ['1'],
  })
}
// getErrorMessage() {
//   return this.loginform.controls.email.hasError('required') ? 'You must enter a value' :
//       this.loginform.controls.email.hasError('email') ? 'Not a valid email' :
//           '';
// }
// get f() { return this.loginform.controls }
onSubmit() {
  this.submitted = true;
  
  if (this.loginform.invalid) {
    return;
  } else {
    this.loginform.patchValue({
      user_type:1
    })
  console.log(this.loginform.value);

    this.authservice.login(this.loginform.value).pipe(first()).subscribe( res => {
      this.router.navigate(['/syllabus']);
    },
    _error =>{
    this.message.showNotification('danger', 'Enter Creadentials Correctly');

    })
//  .subscribe(success => {
//   if (success) {
//     this.router.navigate(['/syllabus']);
//     this.message.showNotification('success', 'Login Successfull');
//   } else {
//     this.loginfailed = true;
//     this.onReset();
//   }
//   },error =>{
//     this.message.showNotification('danger', 'Enter Creadentials Correctly');
//   });
//   }
//  success auth

//   this.authservice.login(this.loginform.value)
//   .subscribe((data: any) => {
//     localStorage.setItem('Access_token', data.token)
//     console.log(localStorage.getItem('Access_token'));
//     this .router.navigate(['/dashboard']);
//   },
//   (err: HttpErrorResponse) => {
//     this.loginfailed = true;
//  });

 // auth test
}
}

onReset() {
  this.submitted = false;
  this.loginform.reset();
}




}
