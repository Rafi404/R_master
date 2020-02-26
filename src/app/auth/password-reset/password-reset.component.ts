import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthserviceService } from '../authservice.service';
import { error } from '@angular/compiler/src/util';
import { MessageService } from 'app/services/message.service';
import { MustMatch} from 'app/_helpers/validator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  resetFrom: FormGroup;
  valid_token = true;
  message: string;
  submitted = false;
  constructor(private route: ActivatedRoute, private _formBuilder: FormBuilder,
    private authservice: AuthserviceService,
    private toast: ToastrService, private routes: Router, private alert: MessageService) {
    this.resetFrom = this._formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required],
      token: '',
      email: ''
    }, {
      validator: MustMatch('password', 'password_confirmation')
    })
    this.route.queryParams.subscribe(params => {
      this.authservice.validateResetToken(params['token']).subscribe(result => {
        console.log(result);
        this.resetFrom.patchValue({
          token: result.token,
          email: result.email
        })
      },
        _error => {
          this.valid_token = false;
          console.log(_error.error.message)
          this.message = _error.error.message;
        })
    })
  }

  ngOnInit() {
    console.log(this.resetFrom.value)
  }
  get f() { return this.resetFrom.controls};
  onSubmit() {
    console.log(this.resetFrom.value)
    if (!this.resetFrom.valid) {
      return;
    } else {
      this.submitted = true;
      this.authservice.resetPassword(this.resetFrom.value).subscribe(res => {
        console.log(res);
        if (res) {
          this.submitted = false;
          this.toast.success('Passwrod Reset Success..!', 'success');
          // this.alert.showNotification('success', 'Passwrod Reset Success..!');
          this.routes.navigate(['/auth']);
        }
      },
        _error => {
          this.submitted = false;
          this.toast.error('Something Wrong..! Try again with new reset request.', 'Error')
          // this.alert.showNotification('warning', 'Something Wrong..! Try again with new reset request.');
          this.routes.navigate(['/auth']);
        })
    }
  }

}
