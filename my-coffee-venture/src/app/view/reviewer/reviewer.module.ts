
import { NgSelectAsyncModule } from '../../module/sticky/control/async-select/async-select.component';
import { PartialsModule } from './../../module/sticky/partials.module';
import { UploadComponent } from '../../module/sticky/upload/upload.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewerRoutingModule } from './reviewer-routing.module';
import { ReviewerComponent } from './reviewer.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NgbDropdownModule, NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton'; import { RatingModule } from 'primeng/rating';
import { InputTimeModule } from 'src/app/module/sticky/control/input-time/input-time.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { TreeTableModule } from 'primeng/treetable';
import { ReviewModule } from 'src/app/module/sticky/review/review.module';

@NgModule({
  declarations: [ReviewerComponent],
  imports: [
    CommonModule,
    ReviewerRoutingModule, RatingModule, ReviewModule,
    HttpClientModule, InputTimeModule, MatMenuModule,
    FormsModule, ReactiveFormsModule, NgbModule, DialogModule, InputTextareaModule, ToggleButtonModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatCardModule, CalendarModule, InfiniteScrollModule, PartialsModule, TableModule, MessagesModule, NgSelectAsyncModule, MatButtonModule,
    MatMenuModule,
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
export class ReviewerModule { }
