import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Tree } from 'primeng/tree';
import { BaseComponent } from 'src/app/module/sticky/component/base-component';
import { OrgChartService } from 'src/app/module/sticky/modules/org-chart/org-chart.service';
@Component({
  selector: 'app-user-org',
  templateUrl: './user-org.component.html',
  styleUrls: ['./user-org.component.scss']
})
export class UserOrgComponent extends BaseComponent implements OnInit {
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() afterTreeInit: EventEmitter<any> = new EventEmitter();
  @ViewChild('tree', { static: true }) tree: Tree;
  public selectedOrgs: TreeNode[] = [];
  public isPristine = true;

  constructor(
    public orgChartService: OrgChartService,
    public cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    const getTreeOrgSub = this.orgChartService.getTreeView().subscribe(() => {
      this.cd.detectChanges();
      setTimeout(() => {
        this.afterTreeInit.emit();
      }, 100);
    });
    this.subscriptions.push(getTreeOrgSub);
  }

  public onSelectionChange(event: any): void {
    this.change.emit(event);
    this.isPristine = false;
  }
}
