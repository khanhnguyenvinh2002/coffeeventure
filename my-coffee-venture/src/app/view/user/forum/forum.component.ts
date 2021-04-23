import { ReviewService } from 'src/app/module/sticky/modules/review/review.service';
import { NotificationService } from '../../../module/sticky/common/notification/notification.service';
import { UserShopRequestPayload } from '../../../module/sticky/modules/user-shop/user-shop-request.payload';
import { UserShopService } from '../../../module/sticky/modules/user-shop/user-shop.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseListComponent } from 'src/app/module/sticky/component';
import { JournalRequestPayload } from 'src/app/module/sticky/modules/journal/journal-request.payload';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { JournalService } from 'src/app/module/sticky/modules/journal/journal.service';
import { ReviewRequestPayload } from 'src/app/module/sticky/modules/review/review-request.payload';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  public stopScrolling = false;
  public stopScrollingReview = false;
  public formDataAdd = new FormData();
  daysSelected: any[] = [];
  public isLoaded = false;
  public journalContent: string;
  public journalStatus: boolean;
  public journalAdd: any = {};
  public dataSource: any = {};
  public dataSourceReview: any = {};
  public images = [];
  date: { year: number, month: number };
  dates: Date[];
  dateJournal: Date[];
  selectedFile: File = null;
  data: any;
  journals: any;
  isLoadedReview = false;
  request = new JournalRequestPayload();
  reviewRequest = new ReviewRequestPayload();
  public imageUrl = 'assets/img/cf_bg1.jpg';
  constructor(private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer, private http: HttpClient, public journalService: JournalService, public reviewService: ReviewService, private noti: NotificationService) { }

  ngOnInit(): void {
    this.initJournal();
    this.initReview();
  }
  initReview() {
    this.reviewRequest.pageIndex = 0;
    this.reviewRequest.pageSize = 3;
    this.reviewService.getAll(this.reviewRequest).subscribe(res => {
      this.dataSourceReview.items = res;
      this.dataSourceReview.items.forEach(element => {
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
      });
    })

  }
  initJournal() {
    this.request.pageIndex = 0;
    this.request.pageSize = 3;
    this.journalService.getAll(this.request).subscribe(res => {
      this.dataSource.items = res;
      this.dataSource.items.forEach(element => {
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
      });
    })
  }
  onScrollDownReview() {
    if (this.stopScrollingReview == true) {
      this.isLoadedReview = true;
      return;
    }
    this.isLoadedReview = false;
    this.reviewRequest.pageIndex++;
    this.reviewService.getAll(this.reviewRequest).subscribe(res => {

      if (!res || res == [] || res.length == 0) {
        this.stopScrollingReview = true;
        return;
      }
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
      this.isLoadedReview = true;
      this.dataSourceReview.items = this.dataSourceReview.items ? this.dataSourceReview.items.concat(res) : res;

    });
  }

  onScrollDown() {
    if (this.stopScrolling == true) {
      this.isLoaded = true;
      return;
    }
    this.isLoaded = false;
    this.request.pageIndex++;
    this.journalService.getAll(this.request).subscribe(res => {

      if (!res || res == [] || res.length == 0) {
        this.stopScrolling = true;
        return;
      }
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
      this.dataSource.items = this.dataSource.items ? this.dataSource.items.concat(res) : res;

    });
  }



}
