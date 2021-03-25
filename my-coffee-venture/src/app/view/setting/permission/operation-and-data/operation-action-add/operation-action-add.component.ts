import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { forkJoin } from 'rxjs';
import { SaveConfirmation, CancelConfirmation } from 'src/app/module/sticky/common/confirmation';
import { NotificationService } from 'src/app/module/sticky/common/notification/notification.service';
import { BaseComponent } from 'src/app/module/sticky/component/base-component';
import { DialogRef } from 'src/app/module/sticky/crud/dialog/dialog-ref.model';
import { ActionRequestPayload } from 'src/app/module/sticky/modules/action/action.request.payload';
import { ActionService } from 'src/app/module/sticky/modules/action/action.service';
import { OperationRequestPayload } from 'src/app/module/sticky/modules/operation/operation-request.payload';
import { OperationService } from 'src/app/module/sticky/modules/operation/operation.service';

@Component({
    selector: 'app-operation-action',
    templateUrl: './operation-action-add.component.html',
    styleUrls: ['./operation-action-add.component.scss']
})
export class OperationActionAddComponent extends BaseComponent implements OnInit {
    @ViewChild('form', { static: true }) form: NgForm;
    public dataSource: any = {};
    public selectedActions = [];
    @Input() dialogRef: DialogRef;
    @Output() success: EventEmitter<any> = new EventEmitter();
    public request = new ActionRequestPayload();
    public operationRequestPayLoad = new OperationRequestPayload();
    constructor(
        public actionService: ActionService,
        public operationService: OperationService,
        public notification: NotificationService,
        public cd: ChangeDetectorRef) {
        super();
    }

    ngOnInit() {
        this.request.pageIndex = 0;
        this.request.pageSize = 10;
        this.operationRequestPayLoad.pageIndex = 0;
        this.operationRequestPayLoad.pageSize = 10;
        this.initData();
    }

    public initData(): void {
        const $selectAndCount = [
            this.actionService.select(this.request),
            this.actionService.count(this.request)];

        const sub = forkJoin($selectAndCount).subscribe(
            (response: any[]) => {
                this.dataSource.items = response[0];
                this.dataSource.paginatorTotal = response[1];
                if (this.cd && !this.cd['destroyed']) {
                    this.cd.detectChanges();
                }
            });

        this.subscriptions.push(sub);
    }

    public onPageChange(event: PageEvent) {
        this.request.pageIndex = event.pageIndex;
        this.request.pageSize = event.pageSize;

        this.initData();
    }

    public onBtnSave() {
        if (this.selectedActions && this.selectedActions.length > 0) {
            const save = new SaveConfirmation();
            save.accept = () => {
                this.dialogRef.input.actionId = this.selectedActions.map(e => e.id);
                this.operationService.bulkMergeAction(this.dialogRef.input).subscribe(res => {
                    this.notification.showSuccess();
                    this.success.emit(true);
                    this.dialogRef.hide();
                    if (this.cd && !this.cd['destroyed']) {
                        this.cd.detectChanges();
                    }
                    this.resetVariables();
                });
            };
            this.notification.confirm(save);
        } else {
            this.dialogRef.hide();
            if (this.cd && !this.cd['destroyed']) {
                this.cd.detectChanges();
            }
            this.resetVariables();

        }
    }
    private resetVariables() {
        this.request.pageIndex = 0;
        this.request.pageSize = 10;
        this.selectedActions = null;
        this.dataSource.items = null;
        this.dataSource.paginatorTotal = null;
    }

    public onBtnCancel() {
        if (this.selectedActions && this.selectedActions.length > 0) {

            const cancel = new CancelConfirmation();
            cancel.accept = () => {
                this.notification.showSuccess();
                this.dialogRef.hide();
                if (this.cd && !this.cd['destroyed']) {
                    this.cd.detectChanges();
                }
                this.resetVariables();

            };
            this.notification.confirm(cancel);
        } else {
            this.dialogRef.hide();
            if (this.cd && !this.cd['destroyed']) {
                this.cd.detectChanges();
            }
            this.resetVariables();


        }
        // if (this.form) {
        //     if (this.form.form.touched) {
        //         const cancel = new SaveConfirmation();
        //         cancel.accept = () => {
        //             this.selectedActions = null; 
        //             this.dialogRef.hide();
        //             this.cd.detectChanges();
        //         };
        //         this.notification.confirm(cancel);
        //     } else {
        //         this.dialogRef.hide();
        //         this.cd.detectChanges();
        //     }
        // } else {
        //     this.dialogRef.hide();
        //     this.cd.detectChanges();
        // }
    }

    public onShow() {
        this.operationRequestPayLoad.id = this.dialogRef.input.id;
        this.request.excludeOperationId = this.dialogRef.input.id;
        const $selectAndCount = [
            this.actionService.select(this.request),
            this.actionService.count(this.request)];

        const sub = forkJoin($selectAndCount).subscribe(
            (response: any[]) => {
                this.dataSource.items = response[0];
                this.dataSource.paginatorTotal = response[1];
                if (this.cd && !this.cd['destroyed']) {
                    this.cd.detectChanges();
                }
            });

        this.subscriptions.push(sub);
    }
}
