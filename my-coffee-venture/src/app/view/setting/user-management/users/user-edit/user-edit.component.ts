import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as config from './user-edit.config';
import { NgForm } from '@angular/forms';
import { UserOrgComponent } from './user-org/user-org.component';
import { TreeNode } from 'primeng/api';
import { BaseComponent } from 'src/app/module/sticky/component/base-component';
import { NotificationService } from 'src/app/module/sticky/common/notification/notification.service';
import { FormDynamicData } from 'src/app/module/sticky/crud/component/form-dynamic-data.model';
import { DialogRef } from 'src/app/module/sticky/crud/dialog/dialog-ref.model';
import { OrgChartDto } from 'src/app/module/sticky/modules/org-chart/org-chart.model';
import { OrgChartService } from 'src/app/module/sticky/modules/org-chart/org-chart.service';
import { RoleService } from 'src/app/module/sticky/modules/role/role.service';
import { UserService } from 'src/app/module/sticky/modules/user/user.service';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent extends BaseComponent implements OnInit {
    @ViewChild('form', { static: true }) form: NgForm;
    @ViewChild('userOrg', { static: true }) userOrg: UserOrgComponent;

    public formData: FormDynamicData = new FormDynamicData();
    public userData: any = {};
    public titles = config.TITLE;
    // public mainConfig: any = mainConfig.MAIN_CONFIG;
    public formTitle = 'USER.HEADER_DETAIL';
    public operationDialogRef = new DialogRef();
    public buyerHeader = config.HEADER_BUYER;
    public currentUserId: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public userService: UserService,
        public orgService: OrgChartService,
        public cd: ChangeDetectorRef,
        private notice: NotificationService,
        public roleService: RoleService,
    ) {
        super();
        this.formData = {
            formId: 'user-edit',
            title: 'USER.HEADER_DETAIL',
            isCancel: true,
            service: this.roleService,
        };
    }

    ngOnInit() {
        const routeSub = this.route.params.subscribe((params) => {
            if (params.id) {
                this.currentUserId = params.id;
                this.userService.selectById(params.id).subscribe((res) => {
                    this.userData = new OrgChartDto(res);
                    this.userData.buyerNameDto = this.userData.buyerName ? this.toDto('userName', this.userData.buyerName) : null;
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
                this.userData = {};
            }
        });
        this.subscriptions.push(routeSub);
    }

    public onBtnSaveClick(): void {
        // const query = {
        //     orgIds: this.userOrg.selectedOrgs
        //         .map((x) => x.data)
        //         .map((x) => x.id),
        //     isUpdUserOrg: !this.userOrg.isPristine,
        // };

        this.userService.merge(this.userData).subscribe(() => {
            this.notice.showSuccess();
            this.onBtnCancelClick();
        });
    }

    public onAfterTreeInit(): void {
        this.setTreeSelection(this.userOrg.orgChartService.treeData);
    }

    public setTreeSelection(treeNode: TreeNode[]): void {
        for (const item of treeNode) {
            if (
                this.userData.userOrganization &&
                (this.userData.userOrganization as any[]).some(
                    (x) => x.id === item.data.id
                )
            ) {
                this.userOrg.selectedOrgs.push(item);
            }
            if (item.children && item.children.length > 0) {
                this.setTreeSelection(item.children);
            }
        }
    }

    public markFormTouched(): void {
        setTimeout(() => {
            this.form.form.markAsDirty();
        }, 0);
    }

    public onChangeBuyer(event: any): void {
        this.userData.userId = event ? event.personId : null;
    }

    public onBtnCancelClick(): void {
        const pathStrings = document.location.pathname.split('/');
        pathStrings.pop();
        if (this.currentUserId) {
            pathStrings.pop();
        }
        const path = pathStrings.join('/');
        this.router.navigate([`${path}`]);
    }
}
