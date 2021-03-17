import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginChildComponent } from '../auth/login/login-child/login-child.component';
import { AuthenComponent } from './authen.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{
  path: '', component: AuthenComponent,
  children: [
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    },
    {
      path: 'login',
      component: LoginComponent,
      data: { returnUrl: window.location.pathname }
    },
    {
      path: 'login-child',
      component: LoginChildComponent,
    }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenRoutingModule { }
