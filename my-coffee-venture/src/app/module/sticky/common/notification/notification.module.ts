import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from './notification.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
    declarations: [ConfirmationDialogComponent],
    imports: [
        CommonModule,
        ConfirmDialogModule
    ],
    entryComponents: [
        ConfirmationDialogComponent
    ],
    providers: [NotificationService]
})
export class NotificationModule { }
