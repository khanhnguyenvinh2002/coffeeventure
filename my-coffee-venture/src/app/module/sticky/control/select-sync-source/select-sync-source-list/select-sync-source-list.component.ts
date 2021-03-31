import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequestPayload } from 'src/app/module/sticky/common/http/request-payload.model';
import { BaseListComponent } from 'src/app/module/sticky/component';
import { DialogRef } from 'src/app/module/sticky/crud/dialog/dialog-ref.model';

@Component({
  selector: 'app-select-sync-source-list',
  templateUrl: './select-sync-source-list.component.html',
  styleUrls: ['./select-sync-source-list.component.scss']
})
export class SelectSyncSourceListComponent extends BaseListComponent implements OnInit {
  @Output() select: EventEmitter<any> = new EventEmitter();
  @Input() dialogRef: DialogRef = new DialogRef();

  public selectedRow: any = {};

  constructor() {
    super();
  }

  ngOnInit() {
    this.baseService = this.dialogRef.input.service;
    const request = new RequestPayloadSyncSource();
    if (!(this.dialogRef.input.requestPayload instanceof RequestPayload)) {
      request.code = this.dialogRef.input.requestPayload.code ? this.dialogRef.input.requestPayload.code : null;
      request.name = this.dialogRef.input.requestPayload.name ? this.dialogRef.input.requestPayload.name : null;
      request.ouId = this.dialogRef.input.requestPayload.ouId ? this.dialogRef.input.requestPayload.ouId : null;
      request.orgCode = this.dialogRef.input.requestPayload.orgCode ? this.dialogRef.input.requestPayload.orgCode : null;
      request.projectCode = this.dialogRef.input.requestPayload.projectCode ? this.dialogRef.input.requestPayload.projectCode : null;
      this.request = request;
    } else {
      this.request = this.dialogRef.input.requestPayload ? this.dialogRef.input.requestPayload : new RequestPayload();
    }
    this.request.type = null;
    this.request.date = null;
    super.ngOnInit();
  }

  public onSelectRow(): void {
    this.select.emit(this.selectedRow);
    this.dialogRef.hide();
  }
}

export class RequestPayloadSyncSource extends RequestPayload {
  code: string;
  name: string;
  ouId?: number;
  orgCode: string;
  projectCode: string;
}
