import {
    Component, Input, OnInit, forwardRef, NgModule,
    NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, Output, EventEmitter, ChangeDetectorRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { concatMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { SelectSyncSourceListComponent } from './ng-select-async-list-dialog/ng-select-async-list-dialog.component';
import { SelectSyncSourceAddComponent } from './ng-select-async-list-add/ng-select-async-list-add.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpService } from 'src/app/module/sticky/common/http/http.service';
import { RequestPayload } from 'src/app/module/sticky/common/http/request-payload.model';
import { DialogRef } from 'src/app/module/sticky/crud/dialog/dialog-ref.model';
import { SelectSyncSourceComponent } from '../select-sync-source/select-sync-source.component';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgSelectAsyncListComponent),
    multi: true
};

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ng-select-async-list',
    templateUrl: './ng-select-async-list.component.html',
    styleUrls: ['./ng-select-async-list.component.css'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})

export class NgSelectAsyncListComponent implements OnInit, ControlValueAccessor {
    @Input() service: HttpService;
    @Input() placeholder: string;
    @Input() multiple: boolean;
    @Input() bindLabel: string;
    @Input() bindValue: string;
    @Input() disabled: boolean;
    @Input() dropdownPosition: string;
    @Input() selectedItems: string;
    @Input() closeOnSelect: boolean;
    @Input() searchFn: any;
    @Input() clearable: boolean;
    @Input() actionGet: string;
    @Input() actionCount: string;

    /* Custom input */
    @Input() suffixLabel: string;
    @Input() suffixValue: string;
    // @Input() initValue: Entity;
    @Input() requestPayload: RequestPayload;
    @Input() disabledCondition: any;
    @Input() msgEmpty: string;
    @Input() canAdd: boolean;
    @Input() selectAll: boolean;
    @Input() export: boolean;

    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();
    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() addNew: EventEmitter<any> = new EventEmitter();

    @Input() header: string;
    @Input() columns: any;
    @Input() width = '90vw';
    @Input() name: string;
    @Input() isOnTable = false;

    // For list
    public dialogRef: DialogRef = new DialogRef();
    public dialogRefAdd: DialogRef = new DialogRef();
    public isShowDialog = false;

    public count: number;
    public listBuffer = [];

    private userBufferSize = 20;
    private numberOfItemsFetchingMore = 10;
    public isLoading = false;

    public subCountAndLoad: Subscription;

    public requestFilter: RequestPayload = new RequestPayload();

    private actionGetName: string;
    private actionCountName: string;

    private privateValue: any = '';
    get value(): any { return this.privateValue; }
    set value(v: any) {
        if (v !== this.privateValue) {
            this.privateValue = v;
            this.onChange(v);
            this.change.emit(v);
        }
    }

    writeValue(value: any) {
        this.privateValue = value;
        this.onChange(value);
    }

    onChange = (_: any) => { };
    onTouched = () => { };
    registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }

    constructor(
        public toastr: ToastrService,
        // public translateService: TranslateService,
        public cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.actionGetName = !this.actionGet ? 'select' : this.actionGet;
        this.actionCountName = !this.actionCount ? 'count' : this.actionCount;

        this.searchFn = !this.searchFn ? () => true : this.searchFn;

        // if (this.initValue === undefined || this.initValue === null) { return; }
        // this.listBuffer.push(this.initValue);

        if (!!this.requestPayload) {
            this.userBufferSize = this.requestPayload.pageSize ? this.requestPayload.pageSize : 20;
        }
    }

    public onOpen(): void {
        this.requestFilter = !this.requestPayload ? new RequestPayload() : Object.assign(new RequestPayload(), this.requestPayload);
        this.requestFilter.pageIndex = 0;
        this.requestFilter.pageSize = this.userBufferSize;
        this.loadAndCountUser(this.requestFilter, true);
    }

    public onClose(): void {
        this.listBuffer = [];
    }

    public onScrollToEnd(): void {
        if (this.count === this.listBuffer.length) {
            return;
        }
        this.fetchMore();
    }

    public onScroll({ end }): void {
        if (this.isLoading || this.count === this.listBuffer.length) {
            return;
        }

        if (end + this.numberOfItemsFetchingMore >= this.listBuffer.length) {
            this.fetchMore();
        }
    }

    /**
     * Fetch more data to combobox source
     */
    private fetchMore(): void {
        const len = this.listBuffer.length;
        this.isLoading = true;
        this.requestFilter.pageIndex = (len / this.requestFilter.pageSize - 1);
        this.requestFilter.pageSize = this.count - len < this.userBufferSize ? this.count - len : this.userBufferSize;
        this.service[this.actionGetName](this.requestFilter, false).subscribe(response => {
            const more = response;
            this.disableOption(more);
            this.isLoading = false;
            this.listBuffer = this.listBuffer.concat(more);
        }, (error: any) => {
            this.toastr.error(error.error);
        });
    }

    /**
     * Handle event when input search
     * @param event: event when input search
     */
    public onSearch(event: any): void {
        if (event.term === '') {
            this.requestFilter = !this.requestPayload ? new RequestPayload() : Object.assign(new RequestPayload(), this.requestPayload);
            this.requestFilter.pageIndex = 0;
            this.requestFilter.pageSize = this.userBufferSize;
            this.loadAndCountUser(this.requestFilter);
        } else {
            this.requestFilter[this.bindLabel] = event.term;
            this.requestFilter.pageIndex = 0;
            this.requestFilter.pageSize = this.userBufferSize;
            this.loadAndCountUser(this.requestFilter);
        }
    }

    /**
     * Load data and count data
     */
    private loadAndCountUser(searchEntity: RequestPayload, onOpen?: boolean): void {
        // Show spinner
        this.isLoading = true;

        // Cancelled service and next to necessary service
        if (!!this.subCountAndLoad) {
            this.subCountAndLoad.unsubscribe();
        }

        // Call service to get data
        const observable = this.service[this.actionCountName](this.requestFilter, false).pipe(concatMap(count => {
            this.count = count as number;
            return this.service[this.actionGetName](searchEntity, false);
        }));

        this.subCountAndLoad = observable.subscribe(
            (response: any[]) => {
                if (response.length === 0 && !!this.msgEmpty && onOpen) {
                    this.toastr.warning(this.msgEmpty);
                }
                this.disableOption(response);
                this.listBuffer = response;
                this.isLoading = false;
                this.cd.detectChanges();
            },
            error => {
                if (typeof (error.error) === 'string') {
                    this.toastr.error(error.error);
                } else {
                    this.toastr.error(
                        error.error[this.bindLabel]
                            ? error.error[this.bindLabel].reduce((a: string, b: string) => a + '. ' + b)
                            : 'An error occurred'
                    );
                }
            }
        );
    }

    private disableOption(list: any[]) {
        const listDisabed = this.filterItems(list, this.disabledCondition);
        list.filter(x => listDisabed.some(y => y === x)).forEach(item => {
            item.disabled = true;
        });
    }

    private filterItems(data: any[], filters: any): any[] {
        let result = [];
        if (filters && data && data.length > 0) {
            const propertiesSearch = Object.keys(filters);
            for (const property of propertiesSearch) {
                result = data.filter(x => x[property] === filters[property]);
            }
        }
        return result;
    }

    /**
     * Handle event when clear input search
     */
    public onClear() {
        const event: any = {};
        event.term = '';
        this.onSearch(event);
    }

    public getLabel(item: any, label: string) {
        const labels = label.split('.');
        labels.forEach(l => {
            item = item[l];
        });

        return item;
    }

    public onBtnSelectAll(): void {
        const searchEntity = Object.assign(new RequestPayload(), JSON.parse(JSON.stringify(this.requestFilter)));
        searchEntity.Skip = 0;
        searchEntity.Take = 0;
        this.service[this.actionGetName](searchEntity, true).subscribe(response => {
            console.log(response);
            this.value = response;
        });
    }

    public copyToClipboard(value: any) {
        if (value == null || value === undefined || value.length === 0) {
            this.toastr.info('No value to copy');
            return;
        }
        let strValue = '';
        if (typeof (value) === 'object') {
            if (Array.isArray(value)) {
                value.forEach(x => {
                    strValue = strValue + `${strValue ? ('\n' + x[this.bindLabel]) : x[this.bindLabel]}`
                        + `${this.suffixValue ? ('\t' + x[this.suffixValue]) : ''}`;
                });
            } else {
                strValue = `${strValue ? ('\n' + value[this.bindLabel]) : value[this.bindLabel]}`
                    + `${this.suffixValue ? ('\t' + value[this.suffixValue]) : ''}`;
            }
        } else {
            strValue = value.toString();
        }

        const el = document.createElement('textarea');
        el.value = strValue;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

        this.toastr.info('Copied text to clipboard');
    }

    public addNewItem(): void {
        this.dialogRefAdd.input = {
            service: this.service
        };
        this.dialogRefAdd.config = {
            style: { width: '750px' },
            baseZIndex: 10000,
            draggable: true,
            maximizable: true,
            title: 'COMMON.CRUD.ADD' + ' ' + this.placeholder,
            btnTitle: 'COMMON.SAVE'
        };
        this.dialogRefAdd.show();
    }

    public onBtnShowDialogListClick(): void {
        this.isShowDialog = false;
        this.cd.detectChanges();
        this.isShowDialog = true;
        this.dialogRef.input = {
            service: this.service,
            header: this.header,
            columns: this.columns,
            requestPayload: this.requestPayload,
            name: this.name,
            width: this.width
        };
        this.dialogRef.show();
    }

    public onSelectRow(rowData: any) {
        if (this.isOnTable) {
            this.value = rowData[this.bindValue];
        } else {
            this.value = rowData;
        }
        this.change.emit(rowData);
        // this.writeValue(this.value);
    }

    public focusOut(): void {
        if (!this.value) {
            this.value = null;
        }
    }
}

@NgModule({
    declarations: [
        NgSelectAsyncListComponent, SelectSyncSourceComponent,
        SelectSyncSourceListComponent,
        SelectSyncSourceAddComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        // TranslateModule,
        NgSelectModule,
        NgbTooltipModule,
        DialogModule,
        TableModule,
        MatInputModule,
        MatPaginatorModule
    ],
    exports: [
        NgSelectAsyncListComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA,
    ]
})

export class NgSelectAsyncListModule { }
