import { ShopItemAddComponent } from './shop-item-add/shop-item-add.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopItemComponent } from './shop-item/shop-item.component';
import { ShopComponent } from './shop.component';
import { AuthGuard } from 'src/app/module/sticky/modules/auth/auth.guard';
import { ShopGoogleApiComponent } from './shop-item/shop-google-api/shop-google-api.component';
import { ShopOsmApiComponent } from './shop-item/shop-osm-api/shop-osm-api.component';
import { MapComponent } from './shop-item/map/map.component';

const routes: Routes = [
  { path: '', component: ShopComponent },
  { path: 'shop-item/:id', component: ShopItemComponent },
  { path: 'shop-map', component: ShopGoogleApiComponent },
  { path: 'osm-search', component: MapComponent },
  { path: 'coordinate-search', component: MapComponent },
  {
    path: 'shop-item-add', component: ShopItemAddComponent,
    canActivate: [AuthGuard], data: {
      expectedRole: 'ADMIN'
    }
  },
  {
    path: 'shop-item-edit/:id', component: ShopItemAddComponent,
    canActivate: [AuthGuard], data: {
      expectedRole: 'ADMIN'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
