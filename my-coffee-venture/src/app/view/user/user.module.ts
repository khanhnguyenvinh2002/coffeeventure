import { ReviewerModule } from './../reviewer/reviewer.module';
import { InputTimeModule } from 'src/app/module/sticky/control/input-time/input-time.module';
import { ForumComponent } from './forum/forum.component';
import { PartialsModule } from './../../module/sticky/partials.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
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
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ReviewModule } from 'src/app/module/sticky/review/review.module';
@NgModule({
  declarations: [UserComponent, ShopSavedComponent, ForumComponent],
  imports: [
    CommonModule,
    UserRoutingModule, ReviewModule,
    HttpClientModule, InputTimeModule, ReviewerModule,
    FormsModule, ReactiveFormsModule, NgbModule, DialogModule, InputTextareaModule, ToggleButtonModule, MatIconModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule, MatCardModule, CalendarModule, InfiniteScrollModule, PartialsModule, TableModule, MessagesModule, MatButtonModule,

    MatSelectModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDialogModule,

    // ng-bootstrap modules
    NgbDropdownModule,
    NgbTooltipModule,
    // TranslateModule,
    ConfirmDialogModule,
    InputTextModule,
    TooltipModule
  ]
})
export class UserModule { }
