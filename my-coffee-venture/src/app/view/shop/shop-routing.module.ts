import { ShopItemAddComponent } from './shop-item-add/shop-item-add.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopItemComponent } from './shop-item/shop-item.component';
import { ShopComponent } from './shop.component';
import { AuthGuard } from 'src/app/module/sticky/modules/auth/auth.guard';

const routes: Routes = [{ path: '', component: ShopComponent },
{ path: 'shop-item/:id', component: ShopItemComponent },
{
  path: 'shop-item-add', component: ShopItemAddComponent,
  canActivate: [AuthGuard],
}
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  // {
  //   path: '',
  //   redirectTo: '/heroes',
  //   pathMatch: 'full'
  // },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
