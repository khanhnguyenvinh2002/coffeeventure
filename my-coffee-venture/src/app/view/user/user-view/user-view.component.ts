import { UserService } from '../../../core/module/partial/modules/user/user.service';
import { ReviewService } from 'src/app/core/module/partial/modules/review/review.service';
import { NotificationService } from '../../../core/base/common/notification/notification.service';
import { UserShopRequestPayload } from '../../../core/module/partial/modules/user-shop/user-shop-request.payload';
import { UserShopService } from '../../../core/module/partial/modules/user-shop/user-shop.service';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/core/base/component';
import { JournalRequestPayload } from 'src/app/core/module/partial/modules/journal/journal-request.payload';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { JournalService } from 'src/app/core/module/partial/modules/journal/journal.service';
import { ReviewRequestPayload } from 'src/app/core/module/partial/modules/review/review-request.payload';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit, OnDestroy {
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

  isLoadedReview = false;
  request = new JournalRequestPayload();
  reviewRequest = new ReviewRequestPayload();
  public id: string;
  private sub: any;
  public userName: string;

  public imageUrl = 'assets/img/cf_bg1.jpg';
  constructor(private cdr: ChangeDetectorRef, public journalService: JournalService, public reviewService: ReviewService, private noti: NotificationService, private route: ActivatedRoute, public userService: UserService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      // this.id = +params['id']; // (+) converts string 'id' to a number
      this.id = params['id'];
      this.userService.viewUserById(this.id).subscribe(res => {
        this.imageUrl = res.avatarPath ? res.avatarPath : 'assets/img/cf_bg1.jpg';
        this.userName = res.userName;
        this.request.createdBy = this.id;
        this.reviewRequest.createdBy = this.id;
        this.request.status = 1;
        this.reviewRequest.status = 1;
        this.initJournal();
        this.initReview();
      })

    });
  }

  public initReview() {
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

  public initJournal() {
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

  public onScrollDownReview() {
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

  public onScrollDown() {
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
  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}
