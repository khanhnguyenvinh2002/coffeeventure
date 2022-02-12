import { ToastrService } from 'ngx-toastr';

import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenRoutingModule } from './authen-routing.module';
import { AuthenComponent } from './authen.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/module/partial/modules/auth/auth.service';
import { AuthGuard } from 'src/app/core/module/partial/modules/auth/auth.guard';
import { NotificationService } from 'src/app/core/base/common/notification/notification.service';
import { httpInterceptorProviders } from 'src/app/core/base/common/utility';
import { HttpClientModule } from '@angular/common/http';
import { WINDOW_PROVIDERS } from 'src/app/core/module/partial/services/window.service';
import { LoginComponent } from './login/login.component';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [AuthenComponent, LoginComponent],
  imports: [
    AuthenRoutingModule, 
    BrowserModule,
    CommonModule,
    TranslateModule.forChild(),
    ReactiveFormsModule
  ],
  providers: [WINDOW_PROVIDERS, HttpClientModule, httpInterceptorProviders, ToastrService,
     AuthService, AuthGuard, NotificationService],
})
export class AuthenModule { }
