import { NgModule } from '@angular/core';
import { PermissionComponent } from './permission/permission.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleComponent } from './permission/role/role.component';
import { OperationComponent } from './permission/operation/operation.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import { RoleEditComponent } from './permission/role/role-edit/role-edit.component';
import { TreeTableModule } from 'primeng/treetable';
import { TreeModule } from 'primeng/tree';
import { UserEditComponent } from './user-management/users/user-edit/user-edit.component';
import { UsersListComponent } from './user-management/users-list.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ContextMenuModule } from 'primeng/contextmenu';
import { OperationEditComponent } from './permission/operation/operation-edit/operation-edit.component';
import { UserOrgComponent } from './user-management/users/user-edit/user-org/user-org.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';
import { OperationAndDataComponent } from './permission/operation-and-data/operation-and-data.component';
import { ActionComponent } from './permission/operation-and-data/action/action.component';
import { OperationDataEditComponent } from './permission/operation-and-data/operation-edit/operation-edit.component';
import { OperationActionAddComponent } from './permission/operation-and-data/operation-action-add/operation-action-add.component';
import { RoleOperationComponent } from './permission/role/role-operation/role-operation.component';
import { ActionViewComponent } from './permission/operation-and-data/action/action-view/action-view.component';
import { CustomizeResourceComponent } from './permission/role/customize-resource/customize-resource.component';
import { InputTextModule } from 'primeng/inputtext';
import { RoleDetailsComponent } from './permission/role/role-details/role-details.component';
import { AuthGuard } from 'src/app/module/sticky/modules/auth/auth.guard';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { DialogComponent } from 'src/app/module/sticky/crud/dialog/dialog.component';
import { NgSelectAsyncModule } from 'src/app/setting/control/ng-select-async/ng-select-async.component';
import { NgSelectAsyncListModule } from 'src/app/setting/control/ng-select-async-list/ng-select-async-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormDynamicComponent } from 'src/app/module/sticky/crud/component/form-dynamic.component';
import { ValidateMessageComponent } from 'src/app/module/sticky/crud/validate-message/validate-message.component';
import { MatInputModule } from '@angular/material/input';
const routes: Routes = [
    {
        path: 'system/permission',
        component: PermissionComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'permission/operation-and-data',
        component: OperationAndDataComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'system/users',
        component: UsersListComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'system/users/add',
        component: UserEditComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'system/users/edit/:id',
        component: UserEditComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    declarations: [
        PermissionComponent,
        RoleComponent,
        RoleEditComponent,
        OperationComponent,
        OperationEditComponent,
        RoleEditComponent,
        UsersListComponent,
        UserEditComponent,
        UserOrgComponent,
        OperationAndDataComponent,
        ActionComponent,
        OperationDataEditComponent,
        OperationActionAddComponent,
        RoleOperationComponent, RoleComponent,
        ActionViewComponent,
        CustomizeResourceComponent,
        RoleDetailsComponent, DialogComponent, FormDynamicComponent, ValidateMessageComponent
    ],
    exports: [],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        TranslateModule,
        MatPaginatorModule,
        MatButtonModule,
        MatFormFieldModule,
        RadioButtonModule,
        DialogModule,
        TreeTableModule,
        TreeModule,
        ReactiveFormsModule,
        MatMenuModule,
        ContextMenuModule,
        MatIconModule,
        InputSwitchModule,
        MatDatepickerModule,
        ConfirmDialogModule,
        OverlayPanelModule,
        NgbModule,
        TableModule,
        MatInputModule,
        InputTextModule,

        NgSelectAsyncModule,
        MatProgressSpinnerModule,
        NgSelectModule,
        NgSelectAsyncListModule
    ],
    providers: [],
})
export class SettingModule { }
