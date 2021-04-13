import { HttpEventType } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { NotificationService } from 'src/app/module/sticky/common/notification/notification.service';
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
export class ShopItemAddComponent extends BaseComponent implements OnInit {
  @ViewChild('form', { static: true }) form: NgForm;
  public status = false;
  public formData: FormDynamicData = new FormDynamicData();
  public shopData: any = {};
  public titles = TITLE;
  // public mainConfig: any = mainConfig.MAIN_CONFIG;
  public formTitle = 'shop.HEADER_DETAIL';
  public operationDialogRef = new DialogRef();
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
      title: 'shop.HEADER_DETAIL',
      isCancel: true,
      service: this.shopService,
    };
  }

  ngOnInit() {
    const routeSub = this.route.params.subscribe((params) => {
      if (params.id) {
        this.currentshopId = params.id;
        this.shopService.selectById(params.id).subscribe((res) => {
          this.cd.detectChanges();
          setTimeout(() => {
            this.form.form.markAsPristine();
          }, 0);
        });

        // Set role id for operation dialog ref
        this.operationDialogRef.visibility$.subscribe(res => {
          if (res) {
            this.operationDialogRef.input.roleId = params.id;
          }
        });

        this.operationDialogRef.input.styleClass = 'action-sm action-link';
        this.operationDialogRef.input.text = 'ROLE.CUSTOMIZE_RESOURCE';
      } else {
        this.shopData = {};
      }
    });
    this.subscriptions.push(routeSub);
  }


  upload(event: any) {
    this.formDataAdd = event;
  }
  public onBtnSaveClick(): void {
    // const query = {
    //     orgIds: this.shopOrg.selectedOrgs
    //         .map((x) => x.data)
    //         .map((x) => x.id),
    //     isUpdshopOrg: !this.shopOrg.isPristine,
    // };
    // this.formDataAdd.append("minPrice", this.shopData.minPrice);
    // this.formDataAdd.append("maxPrice", this.shopData.maxPrice);
    // this.formDataAdd.append("description", this.shopData.description);
    // this.formDataAdd.append("name", this.shopData.name);
    // this.formDataAdd.append("telephone", this.shopData.telephone);
    // this.formDataAdd.append("alternativeTelephone", this.shopData.alternativeTelephone);
    // this.formDataAdd.append("address", this.shopData.address);
    // this.formDataAdd.append("district", this.shopData.district);
    // this.formDataAdd.append("city", this.shopData.city);
    // this.formDataAdd.append("street", this.shopData.street);
    // this.formDataAdd.append("shopCategory", this.shopData.shopCategory);
    // this.formDataAdd.append("status", this.shopData.status);
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


  public markFormTouched(): void {
    setTimeout(() => {
      this.form.form.markAsDirty();
    }, 0);
  }

  public onChangeBuyer(event: any): void {
    this.shopData.shopId = event ? event.personId : null;
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
