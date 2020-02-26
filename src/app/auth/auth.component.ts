import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from './authservice.service';
import { Router } from '@angular/router';
import { MessageService } from 'app/services/message.service';
import { ConnectionService } from 'ng-connection-service';
import { first } from 'rxjs/operators';
import { environment} from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
// import * as jQuery from 'jquery';
declare var $: any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  private readonly web = 'web';
  hide =true;
  loginform: FormGroup;
  resetform: FormGroup;
  submitted = false;
  loginfailed = false;
  forget = false;
  institution_name: any;
  url = environment.url;
  folder = environment.rootFolder;
  constructor(private formBuilder: FormBuilder, private router: Router, private authservice: AuthserviceService,
    private message: MessageService, private toast: ToastrService) {
      }

  ngOnInit() {
    this.loginform = this.formBuilder.group({
      userid: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      user_type: '1'
    })
    this.resetform = this.formBuilder.group({
      user_id : ['', Validators.required, ],
      mobile : ['', Validators.required]
    })
    this.authservice.getinstituteWeb(this.web).subscribe((res: any) => {
      console.log(res);
      this.institution_name = res.institute.institution_name;
    })
  }
  // getErrorMessage() {
  //   return this.loginform.controls.email.hasError('required') ? 'You must enter a value' :
  //       this.loginform.controls.email.hasError('email') ? 'Not a valid email' :
  //           '';
  // }
  // get f() { return this.loginform.controls }
  onSubmit() {
    if (this.loginform.invalid) {
      return;
    } else {
      this.submitted = true;
      this.loginform.get('user_type').setValue(1);
      this.authservice.login(this.loginform.value)
        .pipe(first())
        .subscribe(
          data => {
            // console.log('success' + JSON.stringify(data));
            if(data.userDetails.dep_id !==102){
              this.toast.error('You Are UnAuthorized','Restricted');
              this.onReset();
            } else {
            this.router.navigate(['/stock-pur']);
            // this.router.navigate([this.returnUrl]);
            }
          },
          _error => {
            console.log('faild' + _error);
            this.loginfailed = true;
            // this.message.showNotification('danger', 'Enter Creadentials Correctly');
            this.toast.error('Enter Credentials Correctly', 'failed');
            this.onReset();
            // this.error = error;
            // this.loading = false;
          });
    }
  }
  onResetRequest() {
    console.log(this.resetform.value);
    if (this.resetform.invalid) {
      return;
    } else {
      this.submitted = true;
      this.authservice.requestPasswordReset(this.resetform.value).subscribe(res => {
        console.log(res);
        this.toast.success(res.message, 'success');

        // this.message.showNotification('success', res.message);
        this.forget = false;
        this.submitted = false;
      },
      _error => {
        console.log(_error);
        this.submitted = false;
        this.toast.error(_error.error.message, 'failed');
        // this.message.showNotification('danger', _error.error.message);
      })
    }
  }
  onReset() {
    this.submitted = false;
    // this.loginform.reset();
  }

}
