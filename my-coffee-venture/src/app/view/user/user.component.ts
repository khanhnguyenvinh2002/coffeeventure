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

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent extends BaseListComponent implements OnInit {
  @ViewChild('calendar')
  calendar: MatCalendar<Moment>;
  public formDataAdd = new FormData();
  pipe = new DatePipe('en-US');
  daysSelected: any[] = [];
  public isLoaded = false;
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
  public imageUrl = 'assets/img/cf_bg1.jpg';
  constructor(private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer, private http: HttpClient, public journalService: JournalService, private noti: NotificationService) { super(); }

  ngOnInit(): void {
    this.request.pageIndex = 0;
    this.request.pageSize = 3;
    this.journalService.select(this.request).subscribe(res => {
      res.forEach(element => {
        let x = new Date(element.createdAt)
        this.selectNew(x, this.calendar);
        this.isSelected(x);
      });
      this.dataSource.items = res;
      this.dataSource.items.forEach(element => {
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
      });
    });
    // this.journalService.getAllById().subscribe(res => {
    //   res.forEach(element => {
    //     let x = new Date(element.createdAt)
    //     this.selectNew(x, this.calendar);
    //     this.isSelected(x);
    //   });
    //   this.dataSource.items = res;
    //   this.dataSource.items.forEach(element => {
    //     let temp = [];
    //     if (element.imagePaths && element.imagePaths.length > 0) {
    //       element.imagePaths.forEach(e => {
    //         let objectURL = 'data:image/jpeg;base64,' + e;
    //         temp.push(this.sanitizer.bypassSecurityTrustResourceUrl(objectURL));
    //         // reader.readAsDataURL(new Blob(e.imagePath]));
    //       });
    //       this.dataSource.items.images = temp;
    //     }
    //   });

    // })

    this.journalService.select().subscribe(res => {

    }
    );
  }
  upload(event: any) {
    this.formDataAdd = event;
  }
  onScrollDown() {
    this.isLoaded = false;
    this.request.pageIndex++;
    this.journalService.select(this.request).subscribe(res => {
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
      this.dataSource.items = this.dataSource.items.concat(res);

    });
  }
  event: any;
  update(value) {
    this.dates = this.dateJournal;
    console.log(value);
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
    console.log(event);
    const date = this.format(event);
    const index = this.daysSelected.findIndex(x => x == date);
    if (index >= 0) {
      this.data = this.dataSource.items.filter(x => this.format(new Date(x.createdAt)) == date);
      console.log(this.data);
    }
    // if (index < 0) this.daysSelected.push(date);
    // else this.daysSelected.splice(index, 1);
    calendar.updateTodaysDate();
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
        }
      )
    });
    // this.journalService.mergeJournalWithImage(this.journalAdd, this.formDataAdd).subscribe(event => {
    //   this.noti.showSuccess();
    //   this.journalContent = "";
    //   this.journalStatus = false;
    //   this.cdr.detectChanges();
    // });
    // this.journalService.insert(this.journalAdd).subscribe(res => {
    //   this.noti.showSuccess();
    //   this.journalContent = "";
    //   this.journalStatus = false;
    //   this.cdr.detectChanges();
    // })
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
  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post('', fd, {
      reportProgress: true,
      observe: 'events'
    }
    ).subscribe(e => {
      if (e.type === HttpEventType.UploadProgress) {
        console.log('Upload Progress: ' + Math.round(e.loaded / e.total * 100))
          ;
      } else if (e.type === HttpEventType.Response) {
        console.log(e);
      }
    })
  }

}
