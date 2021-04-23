import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgbModule, NgbDropdownModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { CalendarModule } from "primeng/calendar";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { MessagesModule } from "primeng/messages";
import { RatingModule } from "primeng/rating";
import { TableModule } from "primeng/table";
import { ToggleButtonModule } from "primeng/togglebutton";
import { TooltipModule } from "primeng/tooltip";
import { ReviewAddComponent } from "src/app/view/reviewer/review-add/review-add.component";
import { NgSelectAsyncModule } from "../control/async-select/async-select.component";
import { InputTimeModule } from "../control/input-time/input-time.module";
import { PartialsModule } from "../partials.module";
import { ReviewItemComponent } from "./review.component";


@NgModule({
    declarations: [ReviewItemComponent, ReviewAddComponent],
    exports: [ReviewItemComponent, ReviewAddComponent
    ],
    imports: [
        CommonModule,
        RatingModule,
        HttpClientModule, InputTimeModule, MatMenuModule,
        FormsModule, ReactiveFormsModule, NgbModule, DialogModule, InputTextareaModule, ToggleButtonModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatCardModule, CalendarModule, InfiniteScrollModule, PartialsModule, TableModule, MessagesModule, MatButtonModule,
        MatMenuModule,
        MatSelectModule,
        MatInputModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatDialogModule,
        NgSelectAsyncModule,
        // ng-bootstrap modules
        NgbDropdownModule,
        NgbTooltipModule,
        // TranslateModule,
        ConfirmDialogModule,
        InputTextModule,
        TooltipModule
    ]
})
export class ReviewModule { }
