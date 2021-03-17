
import { HomeComponent } from './home/home.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseScreenComponent } from './view/base/base-screen/base-screen.component';
import { BaseComponent } from './view/base/base.component';
import { AuthGuard } from './module/sticky/modules/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: BaseScreenComponent
  },
  // { path: "secret", component: HomeComponent },
  { path: 'secret', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] },
  { path: 'user', loadChildren: () => import('./view/user/user.module').then(m => m.UserModule) },
  { path: 'reviewer', loadChildren: () => import('./view/reviewer/reviewer.module').then(m => m.ReviewerModule) },
  { path: 'shop', loadChildren: () => import('./view/shop/shop.module').then(m => m.ShopModule) },
  { path: 'auth', loadChildren: () => import('./view/auth/auth.module').then(m => m.AuthModule) },
  { path: 'authen', loadChildren: () => import('./view/authen/authen.module').then(m => m.AuthenModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes), CardModule, ButtonModule],
  exports: [RouterModule, CardModule, ButtonModule]
})
export class AppRoutingModule { }
