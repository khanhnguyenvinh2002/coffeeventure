
import { TreeNode } from 'primeng/api/treenode';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogRef } from 'src/app/module/sticky/crud/dialog/dialog-ref.model';
import { ActionService } from 'src/app/module/sticky/modules/action/action.service';
@Component({
  selector: 'app-customize-resource',
  templateUrl: './customize-resource.component.html',
  styleUrls: ['./customize-resource.component.scss']
})
export class CustomizeResourceComponent implements OnInit {
  @Input() dialogRef: DialogRef;
  @Input() node: any;
  @Output() performSet: EventEmitter<any> = new EventEmitter();

  public operationData: any[] = [];
  public treeData: TreeNode[];
  public listRestricted: any[] = [];

  constructor(
    public actionService: ActionService,
    public cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.dialogRef.visibility$.subscribe(isDisplay => {
      if (isDisplay) {
        this.actionService.selectResouceByOperation(this.dialogRef.input.operationId).subscribe(resource => {
          this.operationData = resource;
          this.treeData = this.actionService.getTreeView(resource);
          const request = {
            roleId: this.dialogRef.input.roleId,
            operationId: this.dialogRef.input.operationId
          }
          this.actionService.selectResourceRestricted(request).subscribe(restricted => {
            this.listRestricted = restricted;
            this.cd.detectChanges();
          });
        });
      } else {
        this.listRestricted = [];
        this.treeData = [];
      }
    });
  }

  public checkHaveParent(event: any): boolean {
    if (event.parent) {
      return true;
    }
    return false;
  }

  public checkNumberRestricedChildren(event: any) {
    let count = 0;
    if (this.listRestricted.findIndex(x => x.resourceId === event.data.id) > -1) {
      count++;
    }
    if (event.children) {
      event.children.forEach(e => {
        if (this.listRestricted.findIndex(x => x.resourceId === e.data.id) > -1) {
          count++;
        }
      });
    }
    return count;

  }

  public checkRestricted(event: any): boolean {
    return this.listRestricted.some(x => x.resourceId === event.id);
  }

  public onBtnSetClick(): void {
    const request = {
      roleId: this.dialogRef.input.roleId,
      operationId: this.dialogRef.input.operationId,
      resourceRestricted: this.listRestricted
    }
    this.actionService.mergeResourceRestricted(request).subscribe(() => {
      this.performSet.emit();
      this.dialogRef.hide();
    });
  }

  public onBtnCancel(): void {
    this.dialogRef.hide();
  }

  public onNodeSelect(event: any) {
    const index = this.listRestricted.findIndex(x => x.resourceId === event.id);
    if (index > -1) {
      this.listRestricted.splice(index, 1);
    }
  }

  public onNodeUnselect(event: any) {
    const obj = {
      roleId: this.dialogRef.input.roleId,
      operationId: this.dialogRef.input.operationId,
      resourceId: event.id,
      type: event.type
    }
    this.listRestricted.push(obj);
  }
}
