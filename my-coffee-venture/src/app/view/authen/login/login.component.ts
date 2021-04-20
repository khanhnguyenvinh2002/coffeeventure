import { UserRequestPayload } from 'src/app/module/sticky/modules/user/user-request.payload';
import { UserService } from 'src/app/module/sticky/modules/user/user.service';
import { BaseFormComponent } from 'src/app/module/sticky/component';
import { ToastrService } from 'ngx-toastr';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/module/sticky/modules/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  hide2 = true;
  hide1 = true;
  @Input() isLogIn = true;
  loginForm: FormGroup;
  registerForm: FormGroup;
  navigateUrl: string;
  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private authService: AuthService, private userService: UserService, private toastrService: ToastrService) {
    this.createLoginForm();
    this.createRegisterForm();
  }

  ngOnInit() {

  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    })
  }
  createRegisterForm() {
    this.registerForm = this.fb.group({
      'username1': ['', Validators.required],
      'password1': ['', Validators.required],
      'retypePassword': ['', Validators.required]
    })
  }
  checkUser() {
    let request = new UserRequestPayload();
    request.userName = this.registerForm.value.username1;
    this.userService.count(request).subscribe(res => {
      if (res == 0) {
        this.toastrService.success("Username available");

      }
      else {
        this.toastrService.error('User already exists', "Error");

      }
    })
  }
  login() {
    let credentials = this.loginForm.value;
    this.authService.login(credentials.username, credentials.password).subscribe(res => {
      if (res.canAccess && res.accessToken != null) {
        this.authService.setCookie("AccessToken", res.accessToken, 7);
        localStorage.setItem('loggedUser', JSON.stringify({ accessToken: res.accessToken, userName: res.userInfo.userName, roles: res.userInfo.roles }));
        // this.authService.setCookie("UserInfo", JSON.stringify(res.userInfo), 7);
        let path = this.route.snapshot.queryParams.returnUrl ? this.route.snapshot.queryParams.returnUrl : '/app/home';
        this.router.navigate([path]);
      } else {
        this.toastrService.error("Error", 'User does not exist, please register!');
      }

    })

  }
  changeLogin() {
    this.isLogIn = !this.isLogIn;
    this.registerForm.controls['username1'].setValue('');
    this.registerForm.controls['password1'].setValue('');
    this.loginForm.controls['username'].setValue('');
    this.loginForm.controls['password'].setValue('');
    this.registerForm.controls['retypePassword'].setValue('');
    this.registerForm.markAsPristine();
    this.loginForm.markAsPristine();
  }
  register() {
    let credentials = this.registerForm.value;
    let request = new UserRequestPayload();
    request.userName = this.registerForm.value.username1;
    if (credentials.password1 != credentials.retypePassword) {
      this.toastrService.error("Error", 'Password does not match');
      return;
    }
    this.userService.count(request).subscribe(res => {
      if (res == 0) {
        this.authService.register(credentials.username1, credentials.password1).subscribe(res => {
          if (res.canAccess && res.accessToken != null) {
            this.authService.setCookie("AccessToken", res.accessToken, 7);
            localStorage.setItem('loggedUser', JSON.stringify({ accessToken: res.accessToken, userName: res.userInfo.userName, roles: res.userInfo.roles }));
            // this.authService.setCookie("UserInfo", JSON.stringify(res.userInfo), 7);
            let path = this.route.snapshot.queryParams.returnUrl ? this.route.snapshot.queryParams.returnUrl : '/app/home';
            this.router.navigate([path]);
          } else {
            this.toastrService.error("An error has occured", 'Please try again');
          }

        })
      } else {
        this.toastrService.error('User already exists', "Error");
      }
    }
    )


  }
  returnHome() {
    this.router.navigate(['/app/home']);
  }


  // .subscribe(res => {
  //   if (res == true) {
  //     console.log("in");
  //     this.router.navigate(['/app/secret']);
  //   }
  // },
  //   err => console.log("Error while Authenticating"));

}
