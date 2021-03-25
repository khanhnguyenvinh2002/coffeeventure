import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/module/sticky/modules/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private toastrService: ToastrService) {
    this.createLoginForm();
  }

  ngOnInit() {

  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      'username': [' ', Validators.required],
      'password': [' ', Validators.required]
    })
  }

  login() {
    let credentials = this.loginForm.value;
    console.log(credentials);
    this.authService.login(credentials.username, credentials.password).subscribe(res => {
      if (res.canAccess && res.accessToken != null) {
        this.authService.setCookie("AccessToken", res.accessToken, 7);
        localStorage.setItem('loggedUser', JSON.stringify({ accessToken: res.accessToken }));
        this.authService.setCookie("UserInfo", JSON.stringify(res.userInfo), 7);
        this.router.navigate(['/app/secret']);
      } else {
        this.toastrService.error("Error", 'Error');
      }
    })



    // .subscribe(res => {
    //   if (res == true) {
    //     console.log("in");
    //     this.router.navigate(['/app/secret']);
    //   }
    // },
    //   err => console.log("Error while Authenticating"));

  }
}
