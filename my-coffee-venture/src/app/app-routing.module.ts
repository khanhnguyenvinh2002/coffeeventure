import { AuthorComponent } from './view/home/author/author.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseScreenComponent } from './view/base/base-screen/base-screen.component';
import { AuthGuard } from './core/module/partial/modules/auth/auth.guard';
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
      {
        path: 'author', component: AuthorComponent
      },
      { path: 'secret', loadChildren: () => import('./view/secret/secret.module').then(m => m.HomeModule), canActivate: [AuthGuard] },
      {
        path: 'reviewer', loadChildren: () => import('./view/reviewer/reviewer.module').then(m => m.ReviewerModule)
      },
      {
        path: 'user', loadChildren: () => import('./view/user/user.module').then(m => m.UserModule)
      },
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
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }), CardModule, ButtonModule],
  exports: [RouterModule, CardModule, ButtonModule]
})
export class AppRoutingModule { }
