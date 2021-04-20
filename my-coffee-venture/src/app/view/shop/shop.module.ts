import { InputTimeModule } from 'src/app/module/sticky/control/input-time/input-time.module';
import { MessagesModule } from 'primeng/messages';
import { OverlayPanelModule } from 'primeng/overlaypanel';
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
import { NgSelectAsyncModule } from 'src/app/module/sticky/control/async-select/async-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { GalleriaModule } from 'primeng/galleria'; import { CarouselModule } from 'primeng/carousel'; import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReviewModule } from 'src/app/module/sticky/review/review.module';

@NgModule({
  declarations: [ShopComponent, ShopItemComponent, ShopItemAddComponent],
  exports: [ShopItemComponent],
  imports: [
    CommonModule, MessagesModule, InputTimeModule, ReviewModule,
    FormsModule, ButtonModule, MatCardModule, OverlayPanelModule,
    ReactiveFormsModule, CarouselModule, InputTextModule, InfiniteScrollModule,
    ShopRoutingModule, NgSelectModule, NgSelectAsyncModule, PartialsModule, ToggleButtonModule, MatPaginatorModule, MultiSelectModule, GalleriaModule
  ]
})
export class ShopModule { }
