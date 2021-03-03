import { NotificationModule } from './module/sticky/common/notification/notification.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WINDOW_PROVIDERS } from './module/sticky/services/window.service';
import { StickyModule } from './module/sticky/sticky/sticky.module';
import { BaseComponent } from './view/base/base.component';
import { BaseScreenComponent } from './view/base/base-screen/base-screen.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Configuration } from './module/sticky/common/utility/app-configuration.service';
import { CarouselModule } from 'primeng/carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseFooterComponent } from './view/base/base-footer/base-footer.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    BaseScreenComponent,
    BaseFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StickyModule,
    CardModule,
    ButtonModule, CarouselModule, NgbModule, NotificationModule
  ],
  providers: [WINDOW_PROVIDERS,
    Configuration],
  bootstrap: [AppComponent]
})
export class AppModule { }
