import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseScreenComponent } from './view/base/base-screen/base-screen.component';
import { BaseComponent } from './view/base/base.component';
import { AuthGuard } from './module/sticky/modules/auth/auth.guard';
import { LoginComponent } from './view/authen/login/login.component';
import { HomeComponent } from './view/home/home.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'app',
    component: HomeComponent,
    children: [
      {
        path: 'home', component: BaseScreenComponent
      },
      { path: 'secret', loadChildren: () => import('./view/secret/secret.module').then(m => m.HomeModule), canActivate: [AuthGuard] },
      { path: 'user', loadChildren: () => import('./view/user/user.module').then(m => m.UserModule) },
      { path: 'reviewer', loadChildren: () => import('./view/reviewer/reviewer.module').then(m => m.ReviewerModule) },
      { path: 'shop', loadChildren: () => import('./view/shop/shop.module').then(m => m.ShopModule) },
      { path: 'authen', loadChildren: () => import('./view/authen/authen.module').then(m => m.AuthenModule) },
      {
        path: 'setting',
        loadChildren: () => import('./view/setting/setting.module').then(m => m.SettingModule),
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }]

  },

  { path: '', redirectTo: 'app', pathMatch: 'full' },
  { path: '**', redirectTo: 'app', pathMatch: 'full' }
];
// { path: "secret", component: HomeComponent },


@NgModule({
  imports: [RouterModule.forRoot(routes), CardModule, ButtonModule],
  exports: [RouterModule, CardModule, ButtonModule]
})
export class AppRoutingModule { }
