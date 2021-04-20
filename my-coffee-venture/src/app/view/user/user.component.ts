import { UserService } from 'src/app/module/sticky/modules/user/user.service';
import { AuthService } from 'src/app/module/sticky/modules/auth/auth.service';
import { JournalRequestPayload } from './../../module/sticky/modules/journal/journal-request.payload';
import { ShopRequestPayload } from './../../module/sticky/modules/shop/shop-request.payload';
import { BaseListComponent } from 'src/app/module/sticky/component/base-list.component';
import { NotificationService } from './../../module/sticky/common/notification/notification.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { JournalService } from 'src/app/module/sticky/modules/journal/journal.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatCalendar } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { Moment } from 'moment';
import * as moment from 'moment';
import { newArray } from '@angular/compiler/src/util';
import { NgForm } from '@angular/forms';
import { SaveConfirmation } from 'src/app/module/sticky/common/confirmation/save-confirmation';
import { CancelConfirmation } from 'src/app/module/sticky/common/confirmation';

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
  constructor(private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer, private http: HttpClient, public journalService: JournalService, private noti: NotificationService, private authService: AuthService, private userService: UserService) { super(); }

  ngOnInit(): void {
    this.userName = this.authService.getUser();
    this.userService.selectById(this.authService.getUserId()).subscribe(element => {
      if (element.avatarPath) {
        this.postAvatar = 'data:image/jpeg;base64,' + element.avatarPath;
        this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.postAvatar);
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
      this.dataSource.items.forEach(element => {
        if (element.length == 0) {
          this.allItems = true;
          return;
        }
        let temp = [];
        if (element.imagePaths && element.imagePaths.length > 0) {
          element.imagePaths.forEach(e => {
            let objectURL = 'data:image/jpeg;base64,' + e;
            temp.push(this.sanitizer.bypassSecurityTrustResourceUrl(objectURL));
            // reader.readAsDataURL(new Blob(e.imagePath]));
          });
          element.images = temp;
          if (element.images) {
            element.image = element.images[0];
          }
        }
        this.cdr.detectChanges();
      });
      this.data = this.dataSource.items;
      this.stopScroll = false;
      this.allItems = false;
    });

  }
  upload(event: any) {
    this.formDataAdd = event;
  }

  loadAvatar(event: any) {
    this.formDataAvatar = event;
    this.avatarLoaded = true;
  }
  loadAvatarImage(event: string) {
    this.imageUrl = event;
    this.cdr.detectChanges();
  }
  uploadAvatar() {
    this.userService.uploadAvatar(this.formDataAvatar).subscribe(res => {
      this.noti.showSuccess();
      this.avatarLoaded = false;
      this.userService.selectById(this.authService.getUserId()).subscribe(element => {
        if (element.avatarPath) {
          let objectURL = 'data:image/jpeg;base64,' + element.avatarPath;
          this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
          this.cdr.detectChanges();
          // reader.readAsDataURL(new Blob(e.imagePath]));
        }
      }
      )
    })
  }
  onScrollDown() {
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
        if (element.imagePaths && element.imagePaths.length > 0) {
          element.imagePaths.forEach(e => {
            let objectURL = 'data:image/jpeg;base64,' + e;
            temp.push(this.sanitizer.bypassSecurityTrustResourceUrl(objectURL));
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
  resetCalendar() {
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
  update(value) {
    this.dates = this.dateJournal;
  }
  isSelected = (event: any) => {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    return this.daysSelected.find(x => x == date) ? "selected" : null;
  };

  selectNew(event: any, calendar: any) {
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
  format(event: Date) {
    return event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
  }
  select(event: any, calendar: any) {
    const date = this.format(event);
    const index = this.daysSelected.findIndex(x => x == date);
    if (index >= 0) {
      this.data = this.dataSource.items.filter(x => this.format(new Date(x.createdAt)) == date);
      this.stopScroll = true;
      this.cdr.detectChanges();
    }
    // if (index < 0) this.daysSelected.push(date);
    // else this.daysSelected.splice(index, 1);
    calendar.updateTodaysDate();
  }

  handleFileInput(event) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      }
    }
  }
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  editJournal(rowData?) {
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
        this.journalStatus = false;
        this.input = {};
        setTimeout(() => {
          this.form.form.markAsPristine();
        }, 0);
        this.cdr.detectChanges();
      };
      this.noti.confirm(cancelConfirmation);
    } else {
      this.formDisplay = false;
      setTimeout(() => {
        this.form.form.markAsPristine();
      }, 0);
      this.cdr.detectChanges();
    }
    this.formDataAdd = new FormData();
  }
}
