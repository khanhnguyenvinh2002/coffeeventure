import { LoginComponent } from './../auth/login/login.component';
import { LoginChildComponent } from './../auth/login/login-child/login-child.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenRoutingModule } from './authen-routing.module';
import { AuthenComponent } from './authen.component';


@NgModule({
  declarations: [AuthenComponent, LoginChildComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthenRoutingModule
  ]
})
export class AuthenModule { }
