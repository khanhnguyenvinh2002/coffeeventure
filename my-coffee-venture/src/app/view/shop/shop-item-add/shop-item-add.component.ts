import { HttpEventType } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { NotificationService } from 'src/app/module/sticky/common/notification/notification.service';
import { BaseFormComponent } from 'src/app/module/sticky/component';
import { BaseComponent } from 'src/app/module/sticky/component/base-component';
import { FormDynamicData } from 'src/app/module/sticky/crud/component/form-dynamic-data.model';
import { DialogRef } from 'src/app/module/sticky/crud/dialog/dialog-ref.model';
import { OrgChartDto } from 'src/app/module/sticky/modules/org-chart/org-chart.model';
import { OrgChartService } from 'src/app/module/sticky/modules/org-chart/org-chart.service';
import { RoleService } from 'src/app/module/sticky/modules/role/role.service';
import { ShopService } from 'src/app/module/sticky/modules/shop/shop.service';
export const TITLE = [
  { id: 1, name: 'Mr.' },
  { id: 2, name: 'Mrs.' },
  { id: 3, name: 'Miss' }
];
@Component({
  selector: 'app-shop-item-add',
  templateUrl: './shop-item-add.component.html',
  styleUrls: ['./shop-item-add.component.css']
})
export class ShopItemAddComponent extends BaseFormComponent implements OnInit {
  @ViewChild('form', { static: true }) form: NgForm;
  public status = false;
  public formData: FormDynamicData = new FormDynamicData();
  public shopData: any = {};
  public titles = TITLE;
  // public mainConfig: any = mainConfig.MAIN_CONFIG;
  public formTitle = 'Shop detail';
  public currentshopId: string;
  public formDataAdd = new FormData();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public shopService: ShopService,
    // public orgService: OrgChartService,
    public cd: ChangeDetectorRef,
    private notice: NotificationService
  ) {
    super();
    this.formData = {
      formId: 'shop-edit',
      title: 'Detail',
      isCancel: true,
      service: this.shopService,
    };
  }

  ngOnInit() {
    const routeSub = this.route.params.subscribe((params) => {
      if (params.id) {
        this.currentshopId = params.id;
        this.shopService.selectById(params.id).subscribe((res) => {
          this.shopData = res;
          this.cd.detectChanges();
          setTimeout(() => {
            this.form.form.markAsPristine();
          }, 0);
        });

        // Set role id for operation dialog ref

      } else {
        this.shopData = {};
      }
    });
    this.subscriptions.push(routeSub);
  }


  public upload(event: any) {
    this.formDataAdd = event;
  }
  
  public onBtnSaveClick(): void {

    if (this.form) {
      if (!this.validateForm(this.form, 'shop-edit')) {
        return;
      }
      if (this.form.form.dirty) {
        if (this.status == false) {
          this.shopData.status = 0;
        }
        else {
          this.shopData.status = 1;
        }
        this.shopService.merge(this.shopData).subscribe(event => {
          this.shopService.uploadShopImages(event.id, this.formDataAdd).subscribe(
            res => {
              this.notice.showSuccess();
              this.onBtnCancelClick();
            }
          )
        });
      }
    }
  }


  public markFormTouched(): void {
    setTimeout(() => {
      this.form.form.markAsDirty();
    }, 0);
  }

  public onBtnCancelClick(): void {
    const pathStrings = document.location.pathname.split('/');
    pathStrings.pop();
    if (this.currentshopId) {
      pathStrings.pop();
    }
    const path = pathStrings.join('/');
    this.router.navigate([`${path}`]);
  }

}
