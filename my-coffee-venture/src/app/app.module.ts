import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NotificationModule } from './module/sticky/common/notification/notification.module';
import { Injector, NgModule } from '@angular/core';
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
import { ServiceLocator } from './module/sticky/common/utility/service-locator.service';
import { UploadComponent } from './view/base/upload/upload.component';
import { UploadMultipleComponent } from './view/base/upload-multiple/upload-multiple.component';
import { AuthModule } from './view/auth/auth.module';
import { httpInterceptorProviders } from './module/sticky/common/utility';
@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    BaseScreenComponent,
    BaseFooterComponent,
    UploadMultipleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StickyModule,
    CardModule,
    ButtonModule, CarouselModule, NgbModule, NotificationModule, HttpClientModule, AuthModule
  ],
  providers: [WINDOW_PROVIDERS, HttpClientModule, httpInterceptorProviders,
    Configuration],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {    // Create global Service Injector.
    ServiceLocator.injector = this.injector;
  }
}
