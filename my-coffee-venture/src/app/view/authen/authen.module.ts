import { ToastrService } from 'ngx-toastr';

import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenRoutingModule } from './authen-routing.module';
import { AuthenComponent } from './authen.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/module/sticky/modules/auth/auth.service';
import { AuthGuard } from 'src/app/module/sticky/modules/auth/auth.guard';
import { NotificationService } from 'src/app/module/sticky/common/notification/notification.service';
import { httpInterceptorProviders } from 'src/app/module/sticky/common/utility';
import { HttpClientModule } from '@angular/common/http';
import { WINDOW_PROVIDERS } from 'src/app/module/sticky/services/window.service';
import { Configuration } from 'src/app/module/sticky/common/utility/app-configuration.service';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [AuthenComponent, LoginComponent],
  imports: [
    AuthenRoutingModule, BrowserModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [WINDOW_PROVIDERS, HttpClientModule, httpInterceptorProviders, ToastrService,
    Configuration, AuthService, AuthGuard, NotificationService],
})
export class AuthenModule { }
