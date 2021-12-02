import { Component, OnInit, Input, Output, EventEmitter, HostListener, ViewChild } from '@angular/core';
import { FormDynamicData } from './form-dynamic-data.model';
import { NgForm } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { Guid } from 'guid-typescript';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Observable } from 'rxjs';
import { SaveConfirmation, DeleteConfirmation, CancelConfirmation } from '../../common/confirmation';
import { NotificationService } from '../../common/notification/notification.service';
import { BaseFormComponent } from '../../component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'form-dynamic',
  templateUrl: './form-dynamic.component.html'
})
export class FormDynamicComponent extends BaseFormComponent implements OnInit {
  public key: string;
  public viewLoading$: Observable<boolean>;

  constructor(
    private notification: NotificationService
  ) {
    super();
    this.key = Guid.create().toString();
  }

  @ViewChild('dlg', { static: true }) dialog: Dialog;
  @ViewChild('dlgConfirm', { static: true }) dlgConfirm: ConfirmDialog;

  @Input() formData: FormDynamicData = new FormDynamicData();
  @Input() form: NgForm;
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.code) {
      case 'Escape':
        event.preventDefault();
        const length = document.getElementsByClassName('p-dialog-mask').length;
        if (length === 0) {
          this.onBtnCancelClick();
        }
        break;
      case 'KeyS':
        if (!this.dlgConfirm.maskVisible && event.ctrlKey) {
          event.preventDefault();
          this.onBtnSaveClick();
        }
        break;
      case 'Enter':
      case 'NumpadEnter':
        if (this.dlgConfirm.maskVisible) {
          event.preventDefault();
          this.dlgConfirm.accept();
        }
        break;
      case 'Delete':
        if (event.ctrlKey && this.formData.input.id && !this.dlgConfirm.maskVisible) {
          event.preventDefault();
          this.onBtnDeleteClick();
        }
        break;
      default:
        break;
    }
  }

  ngOnInit() {
    this.viewLoading$ = this.formData.service.isLoading$;
  }
  /**
   * handle save event
   */
  public onBtnSaveClick(): void {
    if (this.form) {
      if (!this.validateForm(this.form, this.formData.formId)) {
        this.notification.showMessage('Form invalid');
        return;
      }
      if (this.form.dirty) {
        const saveConfirmation = new SaveConfirmation();
        saveConfirmation.accept = () => {
          setTimeout(() => {
            this.save.emit();
          }, 200);
        };
        this.notification.confirm(saveConfirmation);
      } else {
        if (this.formData.hideHeader) {
          this.save.emit();
        } else {
          this.cancel.emit();
        }
      }
    } else {
      this.save.emit();
    }
  }

  /**
   * handle delete event
   */
  public onBtnDeleteClick(): void {
    const deleteConfirmation = new DeleteConfirmation();
    deleteConfirmation.accept = () => {
      this.delete.emit();
    };
    this.notification.confirm(deleteConfirmation);
  }
  /**
   * reset form
   */
  public resetForm(): void {
    if (this.form) {
      this.form.resetForm();
    }
  }

  /**
   * mark the form as pristine
   */
  public markAsPristine(): void {
    if (this.form) {
      this.form.form.markAsPristine();
    }
  }

  /**
   * handle cancel event
   */
  public onBtnCancelClick(): void {
    if (this.form) {
      if (this.form.dirty) {
        const cancelConfirmation = new CancelConfirmation();
        cancelConfirmation.accept = () => {
          setTimeout(() => {
            this.cancel.emit();
          }, 200);
        };
        this.notification.confirm(cancelConfirmation);
      } else {
        this.cancel.emit();
      }
    } else {
      this.cancel.emit();
    }
  }
}
