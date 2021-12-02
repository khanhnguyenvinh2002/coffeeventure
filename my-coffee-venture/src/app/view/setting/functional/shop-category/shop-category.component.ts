import { ShopService } from 'src/app/module/sticky/modules/shop/shop.service';
import { ShopRequestPayload } from './../../../../module/sticky/modules/shop/shop-request.payload';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/module/sticky/common/notification/notification.service';
import { NgForm } from '@angular/forms';
import { CancelConfirmation, SaveConfirmation } from 'src/app/module/sticky/common/confirmation';

@Component({
  selector: 'app-shop-category',
  templateUrl: './shop-category.component.html',
  styleUrls: ['./shop-category.component.css']
})
export class ShopCategoryComponent implements OnInit {
  public input: any = {};
  @ViewChild('form', { static: true }) form: NgForm;
  public shopRequest = new ShopRequestPayload();
  public isShowAddUser = false;
  public items: any;
  public cols = [
    { width: '50px', header: 'No' },
    { width: '100px', header: 'Name' },
    { width: '100px', header: 'Code' },
    { width: '70px', header: '', maxWidth: '50px', class: 'action' },
  ];

  constructor(public shopService: ShopService, private cd: ChangeDetectorRef, private router: Router, private noti: NotificationService) { }

  ngOnInit(): void {
    this.initData();
  }
  /**
   * initialize data
   */
  public initData() {
    this.shopService.selectCategory(this.shopRequest).subscribe(res => {
      this.items = res;
      this.input = {};
      this.isShowAddUser = false;
      this.form.form.markAsPristine();
    })
  }
  /**
   * 
   * @param id delete category based on id
   * handle delete event
   */
  public onBtnDeleteClick(id) {
    this.shopService.deleteCategory(id).subscribe(res => {
      this.initData();
      this.noti.showSuccess();
      this.cd.detectChanges();
    })
  }

  /**
   * edit category data
   * @param rowData row containing category data
   */
  public editCategory(rowData?) {
    this.input = {};
    if (rowData) {
      this.input.name = rowData.name;
      this.input.id = rowData.id;
      this.input.code = rowData.code;
    }
    setTimeout(() => {
      this.form.form.markAsPristine();
    }, 0);
    this.isShowAddUser = true;
  }

  /**
   * handle save users
   */
  public onBtnSaveUsers(): void {
    if (this.form.form.dirty) {
      const save = new SaveConfirmation();
      save.accept = () => {
        this.shopService.mergeCategory(this.input).subscribe(res => {
          this.noti.showSuccess();
          this.isShowAddUser = false;
          this.input = {};
          setTimeout(() => {
            this.form.form.markAsPristine();
            this.cd.detectChanges();
          }, 0);
          this.initData();
          this.cd.detectChanges();
        });

      };
      this.noti.confirm(save);
    } else {
      this.isShowAddUser = false;
      this.input = {};
      setTimeout(() => {
        this.form.form.markAsPristine();
      }, 0);
      this.cd.detectChanges();
    }
    this.cd.detectChanges();
  }

  /**
   * Pop up form cancel
   */
  public onBtnCancelUsers(): void {
    if (this.form.form.dirty) {
      const cancelConfirmation = new CancelConfirmation();
      cancelConfirmation.accept = () => {
        this.isShowAddUser = false;
        this.input = {};
        setTimeout(() => {
          this.form.form.markAsPristine();
        }, 0);
        this.cd.detectChanges();
      };
      this.noti.confirm(cancelConfirmation);
    } else {
      this.isShowAddUser = false;
      setTimeout(() => {
        this.form.form.markAsPristine();
      }, 0);
      this.cd.detectChanges();
    }
  }
}
