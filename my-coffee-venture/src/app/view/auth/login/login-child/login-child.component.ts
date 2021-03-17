import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
// NGRX
import { Store } from '@ngrx/store';
import { Login } from 'src/app/module/sticky/auth';
import { AppState } from 'src/app/module/sticky/reducers';
import { AuthService } from 'src/app/module/sticky/auth/_services/auth.service';
// Auth reducers and selectors
export const authConfig = {
  accessToken: 'AccessToken',
  userInfo: 'UserInfo',
};
@Component({
  selector: 'app-login-child',
  templateUrl: './login-child.component.html',
  styleUrls: ['./login-child.component.css']
})
export class LoginChildComponent implements OnInit {
  loginForm: FormGroup;
  @ViewChild('form', { static: true }) form: NgForm;
  public authConfig: any;
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private translate: TranslateService,
    private toastrService: ToastrService,
    private store: Store<AppState>,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.authConfig = authConfig;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginRequest = {
        userName: this.loginForm.value["username"],
        password: this.loginForm.value["password"],
      };
      this.authService.loginChild(loginRequest).subscribe(res => {
        if (res.canAccess && res.accessToken != null) {
          this.authService.setCookie(this.authConfig.accessToken, res.accessToken, 7);
          this.authService.setCookie(this.authConfig.userInfo, JSON.stringify(res.userInfo), 7);
          this.store.dispatch(new Login({ user: res.userInfo }))
          this.router.navigateByUrl('/apps/dashboard');
        } else {
          const message = this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN');
          this.toastrService.error(message, 'Error');
        }
      });
    }
  }
}
