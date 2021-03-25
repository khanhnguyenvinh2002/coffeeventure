import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenComponent } from './authen.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { returnUrl: window.location.pathname }
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenRoutingModule { }
