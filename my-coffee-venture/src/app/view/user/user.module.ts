import { PartialsModule } from './../../module/sticky/partials.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu'; import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages'; import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ShopSavedComponent } from './shop-saved/shop-saved.component';
@NgModule({
  declarations: [UserComponent, ShopSavedComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule, NgbModule, DialogModule, InputTextareaModule, ToggleButtonModule, MatIconModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule, MatCardModule, CalendarModule, InfiniteScrollModule, PartialsModule, TableModule, MessagesModule
  ]
})
export class UserModule { }
