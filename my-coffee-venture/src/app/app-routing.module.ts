import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseScreenComponent } from './view/base/base-screen/base-screen.component';
import { BaseComponent } from './view/base/base.component';

const routes: Routes = [
  {
    path: '',
    component: BaseScreenComponent
  }, { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'user', loadChildren: () => import('./view/user/user.module').then(m => m.UserModule) },
  { path: 'reviewer', loadChildren: () => import('./view/reviewer/reviewer.module').then(m => m.ReviewerModule) },
  { path: 'shop', loadChildren: () => import('./view/shop/shop.module').then(m => m.ShopModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes), CardModule, ButtonModule],
  exports: [RouterModule, CardModule, ButtonModule]
})
export class AppRoutingModule { }
