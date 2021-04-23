import { BaseListComponent } from './../../module/sticky/component/base-list.component';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatCalendar } from '@angular/material/datepicker';
import { DomSanitizer } from '@angular/platform-browser';
import { SaveConfirmation, CancelConfirmation } from 'src/app/module/sticky/common/confirmation';
import { NotificationService } from 'src/app/module/sticky/common/notification/notification.service';
import { AuthService } from 'src/app/module/sticky/modules/auth/auth.service';
import { ReviewRequestPayload } from 'src/app/module/sticky/modules/review/review-request.payload';
import { ReviewService } from 'src/app/module/sticky/modules/review/review.service';
import { UserService } from 'src/app/module/sticky/modules/user/user.service';
import { Moment } from 'moment';

@Component({
  selector: 'app-reviewer',
  templateUrl: './reviewer.component.html',
  styleUrls: ['./reviewer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReviewerComponent implements OnInit {
  @ViewChild('calendar')
  calendar: MatCalendar<Moment>;
  public openingHour: any;
  public input: any = {};
  public formDataAdd = new FormData();
  public formDataAvatar = new FormData();
  daysSelected: any[] = [];
  public formDisplay = false;
  public isLoaded = false;
  public avatarLoaded = false;
  public dataSource: any = {};
  public images = [];
  date: { year: number, month: number };
  dates: Date[];
  datereview: Date[];
  selectedFile: File = null;
  data: any;
  reviews: any;
  request = new ReviewRequestPayload();
  public stopScroll = false;
  public userName: string;
  public allItems = false;
  public pageLoaded = false;
  public postAvatar: any;
  public imageUrl: any = 'assets/img/cf_bg1.jpg';
  constructor(private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer, private http: HttpClient, public reviewService: ReviewService, private noti: NotificationService, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.formDisplay = false;
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
    this.reviewService.select(this.request).subscribe(res => {
      this.dataSource.items = res;
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
      this.data = this.dataSource.items;
      this.stopScroll = false;
      this.allItems = false;
    });

  }

  onScrollDown() {
    if (this.stopScroll == true || this.allItems == true) {
      this.isLoaded = true;
      return
    }
    this.isLoaded = false;
    this.request.pageIndex++;
    this.reviewService.select(this.request).subscribe(res => {
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
  resetCalendar() {
    this.reviewService.getAllById().subscribe(res => {
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
    this.dates = this.datereview;
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

  editReview() {
    this.input = {};
    this.input.content = "";
    this.formDisplay = true;
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
    // }
  }

  onUploadEvent(event) {
    this.formDisplay = false;
    if (event) {
      this.resetCalendar();
      this.initData();
    }
  }
}
