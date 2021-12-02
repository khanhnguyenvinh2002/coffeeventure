import { ToggleButtonModule } from 'primeng/togglebutton';
import { PostComponent } from './post/post.component';
// Angular
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TableModule } from 'primeng/table';
import { InputTimeModule } from 'src/app/module/sticky/control/input-time/input-time.module';
import { FormDynamicComponent } from './crud/component/form-dynamic.component';
import { DialogComponent } from './crud/dialog/dialog.component';
import { ValidateMessageComponent } from './crud/validate-form/validate-form.component';
import { ValidateTooltipDirective } from './crud/validate-form/validate-form.directive';
// NgBootstrap
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogModule } from 'primeng/dialog';
// import { TranslateModule } from '@ngx-translate/core';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService } from 'primeng/api';
import { NgSelectModule } from '@ng-select/ng-select';
import { InputTextModule } from 'primeng/inputtext';
import { TreeTableModule } from 'primeng/treetable';
import { UploadMultipleComponent } from './upload-multiple/upload-multiple.component';
import { UploadComponent } from './upload/upload.component';
import { BaseWaitingComponent } from './base/base-waiting.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        DialogComponent,
        FormDynamicComponent, BaseWaitingComponent, PostComponent,
        ValidateMessageComponent,
        ValidateTooltipDirective, UploadComponent, UploadMultipleComponent],
    exports: [
        DialogComponent,
        ValidateMessageComponent,
        FormDynamicComponent, BaseWaitingComponent, PostComponent,
        ValidateTooltipDirective, UploadComponent, UploadMultipleComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forChild(),

        // angular material modules
        MatButtonModule,
        MatMenuModule,
        MatSelectModule,
        MatInputModule,
        MatIconModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatCardModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatDialogModule,

        // ng-bootstrap modules
        NgbDropdownModule,
        NgbTooltipModule,
        DialogModule, ToggleButtonModule,
        // TranslateModule,
        ConfirmDialogModule,
        TableModule,
        NgSelectModule,
        InputTextModule,
        TooltipModule,
        TreeTableModule,
        InputTimeModule,
    ],
    providers: [ConfirmationService]
})
export class PartialsModule {

}
