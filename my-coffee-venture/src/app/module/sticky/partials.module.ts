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
import { InputDateModule } from 'src/app/module/sticky/control/input-date/input-date.module';
import { SelectSyncSourceAddComponent } from 'src/app/module/sticky/control/ng-select-async-list/ng-select-async-list-add/ng-select-async-list-add.component';
import { SelectSyncSourceListComponent } from 'src/app/module/sticky/control/ng-select-async-list/ng-select-async-list-dialog/ng-select-async-list-dialog.component';
import { NgSelectAsyncModule } from 'src/app/module/sticky/control/ng-select-async/ng-select-async.component';
import { SelectSyncSourceComponent } from 'src/app/module/sticky/control/select-sync-source/select-sync-source.component';
import { FormDynamicComponent } from './crud/component/form-dynamic.component';
import { DialogComponent } from './crud/dialog/dialog.component';
import { ValidateMessageComponent } from './crud/validate-message/validate-message.component';
import { ValidateTooltipDirective } from './crud/validate-message/validate-message.directive';
// NgBootstrap
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogModule } from 'primeng/dialog';
import { TranslateModule } from '@ngx-translate/core';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService } from 'primeng/api';
import { NgSelectModule } from '@ng-select/ng-select';
import { InputTextModule } from 'primeng/inputtext';
import { TreeTableModule } from 'primeng/treetable';
import { NgSelectAsyncListModule } from 'src/app/module/sticky/control/ng-select-async-list/ng-select-async-list.component';
import { UploadMultipleComponent } from './upload-multiple/upload-multiple.component';
import { UploadComponent } from './upload/upload.component';

@NgModule({
    declarations: [
        DialogComponent,
        FormDynamicComponent,
        ValidateMessageComponent,
        ValidateTooltipDirective, UploadComponent, UploadMultipleComponent],
    exports: [
        DialogComponent,
        ValidateMessageComponent,
        FormDynamicComponent,
        ValidateTooltipDirective, UploadComponent, UploadMultipleComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,

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
        DialogModule,
        TranslateModule,
        ConfirmDialogModule,
        TableModule,
        // NgSelectAsyncModule, NgSelectAsyncListModule,
        NgSelectModule,
        InputTextModule,
        TooltipModule,
        TreeTableModule,
        InputDateModule,
    ],
    providers: [ConfirmationService]
})
export class PartialsModule {
}
