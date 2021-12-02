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
import { ShopGoogleApiComponent } from './shop-item/shop-google-api/shop-google-api.component';
import { ShopOsmApiComponent } from './shop-item/shop-osm-api/shop-osm-api.component';
import { GeocodingComponent } from './shop-item/geocoding/geocoding.component';
import { MapPointFormComponent } from './shop-item/map-point-form/map-point-form.component';
import { ResultsListComponent } from './shop-item/results-list/results-list.component';
import { MapComponent } from './shop-item/map/map.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import { OsmSearchComponent } from './shop-item/osm-search/osm-search.component';
import { CoordinateSearchComponent } from './shop-item/coordinate-search/coordinate-search.component';
import { OsmResultComponent } from './shop-item/osm-result/osm-result.component';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    ShopComponent, 
    ShopItemComponent, 
    ShopItemAddComponent, 
    ShopGoogleApiComponent, 
    ShopOsmApiComponent, 
    GeocodingComponent, 
    MapPointFormComponent, 
    ResultsListComponent, 
    MapComponent, 
    OsmSearchComponent, 
    CoordinateSearchComponent, 
    OsmResultComponent],
  exports: [ShopItemComponent, ShopItemAddComponent, ShopComponent],
  imports: [
    CommonModule, 
    MessagesModule, 
    InputTimeModule, 
    ReviewModule,
    FormsModule, 
    ButtonModule, 
    MatCardModule, 
    OverlayPanelModule,
    LeafletModule,
    ReactiveFormsModule, 
    CarouselModule, 
    InputTextModule, 
    InfiniteScrollModule, 
    TooltipModule,
    ShopRoutingModule, 
    NgSelectModule, 
    NgSelectAsyncModule, 
    PartialsModule, 
    ToggleButtonModule, 
    MatPaginatorModule, 
    MultiSelectModule, 
    GalleriaModule, 
    TagModule,
    TranslateModule.forChild(),
  ]
})
export class ShopModule { }
