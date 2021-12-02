import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputTextModule } from 'primeng/inputtext';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PartialsModule } from './module/sticky/partials.module';
import { DialogModule } from 'primeng/dialog';
import { SettingModule } from './view/setting/setting.module';
import { ConfirmationService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { NotificationModule } from './module/sticky/common/notification/notification.module';
import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WINDOW_PROVIDERS } from './module/sticky/services/window.service';
import { StickyModule } from './module/sticky/sticky/sticky.module';
import { BaseHeaderComponent } from './view/base/base.component';
import { BaseScreenComponent } from './view/base/base-screen/base-screen.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Configuration } from './module/sticky/common/utility/app-configuration.service';
import { CarouselModule } from 'primeng/carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseFooterComponent } from './view/base/base-footer/base-footer.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ServiceLocator } from './module/sticky/common/utility/service-locator.service';
import { UploadComponent } from './module/sticky/upload/upload.component';
import { UploadMultipleComponent } from './module/sticky/upload-multiple/upload-multiple.component';
import { httpInterceptorProviders } from './module/sticky/common/utility';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './module/sticky/modules/auth/auth.guard';
import { AuthService } from './module/sticky/modules/auth/auth.service';
import { NotificationService } from './module/sticky/common/notification/notification.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { HomeComponent } from './view/home/home.component';
import { MenubarModule } from 'primeng/menubar'; import { PanelMenuModule } from 'primeng/panelmenu';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenuItem } from 'primeng/api';
import { FormDynamicComponent } from './module/sticky/crud/component/form-dynamic.component';
import { ValidateMessageComponent } from './module/sticky/crud/validate-form/validate-form.component';
import { DropdownModule } from 'primeng/dropdown';
import { AuthorComponent } from './view/home/author/author.component';
import {DividerModule} from 'primeng/divider';
import { TagModule } from 'primeng/tag';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

@NgModule({
  declarations: [
    AppComponent,
    BaseHeaderComponent,
    BaseScreenComponent,
    BaseFooterComponent,
    HomeComponent,
    AuthorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    BrowserAnimationsModule, 
    FormsModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    AppRoutingModule,
    StickyModule, 
    MultiSelectModule, 
    OverlayPanelModule, 
    DropdownModule,
    CardModule, 
    DialogModule, 
    InputTextModule,
    TagModule,
    ConfirmDialogModule, 
    MenubarModule, 
    PartialsModule, 
    PanelMenuModule,
    ButtonModule, 
    CarouselModule, 
    NgbModule, 
    NotificationModule, 
    HttpClientModule, 
    ToastrModule.forRoot(), 
    NgSelectModule, 
    SettingModule, 
    MatPaginatorModule,
    DividerModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
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
// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}