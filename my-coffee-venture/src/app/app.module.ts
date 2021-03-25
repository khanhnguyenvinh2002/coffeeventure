import { DialogModule } from 'primeng/dialog';
import { SettingModule } from './view/setting/setting.module';
import { ConfirmationService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotificationModule } from './module/sticky/common/notification/notification.module';
import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { httpInterceptorProviders } from './module/sticky/common/utility';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './module/sticky/modules/auth/auth.guard';
import { AuthService } from './module/sticky/modules/auth/auth.service';
import { NotificationService } from './module/sticky/common/notification/notification.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { HomeComponent } from './view/home/home.component';
@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    BaseScreenComponent,
    BaseFooterComponent,
    UploadMultipleComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    AppRoutingModule,
    StickyModule,
    CardModule, DialogModule,
    ConfirmDialogModule,
    ButtonModule, CarouselModule, NgbModule, NotificationModule, HttpClientModule, ToastrModule.forRoot(), NgSelectModule, SettingModule
  ],
  providers: [WINDOW_PROVIDERS, HttpClientModule, httpInterceptorProviders, ConfirmationService, ToastrService,
    Configuration, AuthService, AuthGuard, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {    // Create global Service Injector.
    ServiceLocator.injector = this.injector;
  }
}
