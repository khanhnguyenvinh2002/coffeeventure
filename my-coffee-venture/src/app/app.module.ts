import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputTextModule } from 'primeng/inputtext';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PartialsModule } from './core/module/partial/partials.module';
import { DialogModule } from 'primeng/dialog';
import { SettingModule } from './view/setting/setting.module';
import { ConfirmationService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { NotificationModule } from './core/base/common/notification/notification.module';
import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WINDOW_PROVIDERS } from './core/module/partial/services/window.service';
import { StickyModule } from './core/module/partial/sticky/sticky.module';
import { BaseHeaderComponent } from './view/base/base.component';
import { BaseScreenComponent } from './view/base/base-screen/base-screen.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Configuration } from './core/base/common/utility/app-configuration.service';
import { CarouselModule } from 'primeng/carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseFooterComponent } from './view/base/base-footer/base-footer.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ServiceLocator } from './core/base/common/utility/service-locator.service';
import { UploadComponent } from './core/components/upload/upload.component';
import { UploadMultipleComponent } from './core/components/upload-multiple/upload-multiple.component';
import { httpInterceptorProviders } from './core/base/common/utility';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './core/module/partial/modules/auth/auth.guard';
import { AuthService } from './core/module/partial/modules/auth/auth.service';
import { NotificationService } from './core/base/common/notification/notification.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { HomeComponent } from './view/home/home.component';
import { MenubarModule } from 'primeng/menubar'; import { PanelMenuModule } from 'primeng/panelmenu';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenuItem } from 'primeng/api';
import { FormDynamicComponent } from './core/crud/component/form-dynamic.component';
import { ValidateMessageComponent } from './core/crud/validate-form/validate-form.component';
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