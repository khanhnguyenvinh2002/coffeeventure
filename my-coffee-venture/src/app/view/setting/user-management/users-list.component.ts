import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as config from './users-list.config';
import { TreeNode } from 'primeng/api';
import { BaseListComponent } from 'src/app/core/base/component/base-list.component';
import { OrgChartService } from 'src/app/core/module/partial/modules/org-chart/org-chart.service';
import { UserRequestPayload } from 'src/app/core/module/partial/modules/user/user-request.payload';
import { UserService } from 'src/app/core/module/partial/modules/user/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent extends BaseListComponent implements OnInit {
  public selectedOrg: TreeNode;

  constructor(
    public userService: UserService,
    public orgChartService: OrgChartService) {
    super();
  }

  ngOnInit() {
    this.baseService = this.userService;
    this.headers = config.HEADER;
    // this.mainConfig = mainConfig.MAIN_CONFIG;
    this.request = new UserRequestPayload();
    this.formTitle = 'USER.HEADER_LIST';
    super.ngOnInit();
    const getTreeOrgSub = this.orgChartService.getTreeView().subscribe();
    this.subscriptions.push(getTreeOrgSub);
  }

  public onNodeSelect(event?: any): void {
    this.request.orgId = event ? event.node.data.id : null;
    this.initData();
  }

  public onNodeUnselect(): void {
    this.request.orgId = null;
    this.initData();
  }

  public currentPathName(): string {
    return document.location.pathname;
  }
}
