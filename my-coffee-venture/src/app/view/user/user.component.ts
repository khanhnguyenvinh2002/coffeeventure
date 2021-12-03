import { UserService } from 'src/app/core/module/partial/modules/user/user.service';
import { AuthService } from 'src/app/core/module/partial/modules/auth/auth.service';
import { JournalRequestPayload } from '../../core/module/partial/modules/journal/journal-request.payload';
import { ShopRequestPayload } from '../../core/module/partial/modules/shop/shop-request.payload';
import { BaseListComponent } from 'src/app/core/base/component/base-list.component';
import { NotificationService } from '../../core/base/common/notification/notification.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { JournalService } from 'src/app/core/module/partial/modules/journal/journal.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatCalendar } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { Moment } from 'moment';
import * as moment from 'moment';
import { newArray } from '@angular/compiler/src/util';
import { NgForm } from '@angular/forms';
import { SaveConfirmation } from 'src/app/core/base/common/confirmation/save-confirmation';
import { CancelConfirmation } from 'src/app/core/base/common/confirmation';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent extends BaseListComponent implements OnInit {
  @ViewChild('calendar')
  calendar: MatCalendar<Moment>;
  public openingHour: any;
  public input: any = {};
  @ViewChild('form', { static: true }) form: NgForm;
  public formDataAdd = new FormData();
  public formDataAvatar = new FormData();
  pipe = new DatePipe('en-US');
  daysSelected: any[] = [];
  public formDisplay = false;
  public isLoaded = false;
  public avatarLoaded = false;
  public journalContent: string;
  public journalStatus: boolean;
  public journalAdd: any = {};
  public dataSource: any = {};
  public images = [];
  date: { year: number, month: number };
  dates: Date[];
  dateJournal: Date[];
  selectedFile: File = null;
  data: any;
  journals: any;
  request = new JournalRequestPayload();
  public stopScroll = false;
  public userName: string;
  public allItems = false;
  public pageLoaded = false;
  public postAvatar: any;
  public imageUrl: any = 'assets/img/cf_bg1.jpg';
  constructor(private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer, private http: HttpClient, public journalService: JournalService, private noti: NotificationService, private authService: AuthService, private userService: UserService,private translate: TranslateService) { super(); }

  ngOnInit(): void {
    this.userName = this.authService.getUser();
    this.userService.selectById(this.authService.getUserId()).subscribe(element => {
      if (element.avatarPath) {
        this.postAvatar = element.avatarPath;
        this.imageUrl = this.postAvatar;
      }
      this.pageLoaded = true;
    })
    this.resetCalendar();
    this.initData();

  }

  initData() {
    this.request.pageIndex = 0;
    this.request.pageSize = 3;
    this.journalService.select(this.request).subscribe(res => {
      this.dataSource.items = res;
      if (this.dataSource.items && this.dataSource.items.length > 0) {
        this.dataSource.items.forEach(element => {
          if (element.length == 0) {
            this.allItems = true;
            return;
          }
          let temp = [];
          if (element.imageDirectories && element.imageDirectories.length > 0) {
            element.imageDirectories.forEach(e => {
              temp.push(e);
              // reader.readAsDataURL(new Blob(e.imagePath]));
            });
            element.images = temp;
            if (element.images) {
              element.image = element.images[0];
            }
          }
          this.cdr.detectChanges();
        });
      }
      this.data = this.dataSource.items;
      this.stopScroll = false;
      this.allItems = false;
    });

  }
  /**
   * upload form data
   */
  public upload(event: any) {
    this.formDataAdd = event;
  }

  /**
   * load avatar event
   */
   public loadAvatar(event: any) {
    this.formDataAvatar = event;
    this.avatarLoaded = true;
  }

  /**
   * 
   * @load avatar image
   */
   public loadAvatarImage(event: string) {
    this.imageUrl = event;
    this.cdr.detectChanges();
  }
  /**
   * event renew page
   */
  public renewPage() {
    this.resetCalendar();
    this.initData();
  }

  public reset() {
    this.formDataAdd = new FormData();
    this.input = {};
    this.journalStatus = false;
    this.journalContent = "";
    this.formDisplay = false;
    setTimeout(() => {
      this.form.form.markAsPristine();
    }, 0);
  }

  /**
   * upload avatar event
   */
   public uploadAvatar() {
    this.userService.uploadAvatar(this.formDataAvatar).subscribe(res => {
      this.noti.showSuccess();
      this.avatarLoaded = false;
      this.userService.selectById(this.authService.getUserId()).subscribe(element => {
        if (element.avatarPath) {

          this.imageUrl = element.avatarPath;
          this.cdr.detectChanges();
          // reader.readAsDataURL(new Blob(e.imagePath]));
        }
      }
      )
    })
  }

  public onScrollDown() {
    if (this.stopScroll == true || this.allItems == true) {
      this.isLoaded = true;
      return
    }
    this.isLoaded = false;
    this.request.pageIndex++;
    this.journalService.select(this.request).subscribe(res => {
      if (res.length == 0) {
        this.allItems = true;
        return;
      }
      res.forEach(element => {
        let x = new Date(element.createdAt)
        this.selectNew(x, this.calendar);
        this.isSelected(x);
      });
      res.forEach(element => {
        let temp = [];
        if (element.imageDirectories && element.imageDirectories.length > 0) {
          element.imageDirectories.forEach(e => {
            temp.push(e);
            // reader.readAsDataURL(new Blob(e.imagePath]));
          });
          element.images = temp;
        }
      });
      this.isLoaded = true;
      this.dataSource.items =
        this.dataSource.items = this.dataSource.items ? this.dataSource.items.concat(res) : res;;
      this.data = this.dataSource.items;

    });
  }

  public resetCalendar() {
    this.journalService.getAllById().subscribe(res => {
      res.forEach(element => {
        let x = new Date(element.createdAt)
        this.selectNew(x, this.calendar);
        this.isSelected(x);
      });
      this.cdr.detectChanges();
    })
  }
  event: any;

  public update(value) {
    this.dates = this.dateJournal;
  }
  public isSelected = (event: any) => {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    return this.daysSelected.find(x => x == date) ? "selected" : null;
  };

  public selectNew(event: any, calendar: any) {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    const index = this.daysSelected.findIndex(x => x == date);
    if (index < 0) this.daysSelected.push(date);

    calendar.updateTodaysDate();
  }
  public format(event: Date) {
    return event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
  }
  public select(event: any, calendar: any) {
    const date = this.format(event);
    const index = this.daysSelected.findIndex(x => x == date);
    if (index >= 0) {
      this.data = this.dataSource.items.filter(x => this.format(new Date(x.createdAt)) == date);
      this.stopScroll = true;
      this.cdr.detectChanges();
    }
    else {
      this.data = this.dataSource.items.filter(x => this.format(new Date(x.createdAt)) == date);
      this.stopScroll = true;
      this.cdr.detectChanges();
    }
    // if (index < 0) this.daysSelected.push(date);
    // else this.daysSelected.splice(index, 1);
    calendar.updateTodaysDate();
  }

  public handleFileInput(event) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      }
    }
  }
  public onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  public editJournal(rowData?) {
    this.input = {};
    this.input.content = "";
    if (rowData) {
      this.input.name = rowData.name;
      this.input.id = rowData.id;
      this.input.code = rowData.code;
    }
    setTimeout(() => {
      this.form.form.markAsPristine();
    }, 0);
    this.formDisplay = true;
  }
  
  public onBtnSaveJournal() {
    this.journalAdd.content = this.journalContent;
    if (this.journalStatus == true) {
      this.journalAdd.status = 1;
    }
    if (this.journalStatus == false) {
      this.journalAdd.status = 0;
    }
    this.journalAdd.created = new Date();
    this.journalService.insert(this.journalAdd).subscribe(event => {
      this.journalService.uploadJournalImages(event.id, this.formDataAdd).subscribe(
        res => {
          this.noti.showSuccess();
          this.journalContent = "";
          this.journalStatus = false;
          this.cdr.detectChanges();
          this.initData();
          this.resetCalendar();
        }
      )
    });
  }
  public onBtnAddJournal(): void {
    if (this.form) {
      if (!this.validateForm(this.form, 'journal-edit')) {
        return;
      }
      if (this.form.form.dirty) {
        const save = new SaveConfirmation();
        save.accept = () => {
          if (this.journalStatus == true) {
            this.input.status = 1;
          }
          if (this.journalStatus == false) {
            this.input.status = 0;
          }
          this.journalService.insert(this.input).subscribe(event => {
            this.journalService.uploadJournalImages(event.id, this.formDataAdd).subscribe(
              res => {
                this.noti.showSuccess();
                this.journalContent = "";
                this.journalStatus = false;
                this.input = {};
                this.formDisplay = false;
                setTimeout(() => {
                  this.form.form.markAsPristine();
                }, 0);
                this.initData();
                this.resetCalendar();
                this.cdr.detectChanges();
              }
            )
          });

        };
        this.noti.confirm(save);
      } else {
        this.formDisplay = false;
        this.journalStatus = false;
        this.input = {};
        setTimeout(() => {
          this.form.form.markAsPristine();
        }, 0);
        this.cdr.detectChanges();
      }

    }

    this.cdr.detectChanges();
  }

  /**
   * Pop up form cancel
   */
  public onBtnCancelJournal(): void {
    if (this.form.form.dirty) {
      const cancelConfirmation = new CancelConfirmation();
      cancelConfirmation.accept = () => {
        this.formDisplay = false;
        this.journalContent = "";
        this.journalStatus = false;
        this.formDataAdd = new FormData();
        this.input = {};
        setTimeout(() => {
          this.form.form.markAsPristine();
        }, 0);
        this.cdr.detectChanges();
      };
      this.noti.confirm(cancelConfirmation);
    } else {
      this.formDisplay = false;
      this.formDataAdd = new FormData();
      setTimeout(() => {
        this.form.form.markAsPristine();
      }, 0);
      this.cdr.detectChanges();
    }
  }
}
