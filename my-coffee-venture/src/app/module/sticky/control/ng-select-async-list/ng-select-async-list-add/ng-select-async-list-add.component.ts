import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationService } from 'src/app/module/sticky/common/notification/notification.service';
import { DialogRef } from 'src/app/module/sticky/crud/dialog/dialog-ref.model';

@Component({
  selector: 'ng-select-async-list-add',
  templateUrl: './ng-select-async-list-add.component.html',
  styleUrls: ['./ng-select-async-list-add.component.scss']
})
export class SelectSyncSourceAddComponent implements OnInit {
  @Input() dialogRef: DialogRef = new DialogRef();
  @ViewChild('form', { static: true }) form: NgForm;

  public dataSource: any = {};
  constructor(private noticficationService: NotificationService) { }

  ngOnInit() {
  }

  public onBtnSaveClick(): void {
    this.dialogRef.input.service.merge(this.dataSource).subscribe(res => {
      if (res) {
        this.dialogRef.hide();
        this.noticficationService.showSuccess();
      }
    });
  }
}
