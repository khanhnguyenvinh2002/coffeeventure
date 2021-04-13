import { MatCardModule } from '@angular/material/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PartialsModule } from './../../module/sticky/partials.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { ShopItemComponent } from './shop-item/shop-item.component';
import { ShopItemAddComponent } from './shop-item-add/shop-item-add.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgSelectAsyncListModule } from 'src/app/module/sticky/control/ng-select-async-list/ng-select-async-list.component';
import { NgSelectAsyncModule } from 'src/app/module/sticky/control/ng-select-async/ng-select-async.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { GalleriaModule } from 'primeng/galleria'; import { CarouselModule } from 'primeng/carousel'; import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [ShopComponent, ShopItemComponent, ShopItemAddComponent],
  exports: [ShopItemComponent],
  imports: [
    CommonModule,
    FormsModule, ButtonModule, MatCardModule,
    ReactiveFormsModule, CarouselModule, InputTextModule, InfiniteScrollModule,
    ShopRoutingModule, NgSelectModule, NgSelectAsyncModule, PartialsModule, ToggleButtonModule, MatPaginatorModule, MultiSelectModule, GalleriaModule
  ]
})
export class ShopModule { }
