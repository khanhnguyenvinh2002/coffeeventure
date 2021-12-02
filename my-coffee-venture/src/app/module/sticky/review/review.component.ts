import { Router } from '@angular/router';
import { ReviewService } from '../modules/review/review.service';
import { AuthService } from '../modules/auth/auth.service';
import { NotificationService } from '../common/notification/notification.service';
import { HttpService } from 'src/app/module/sticky/common/http/http.service';
import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit, ChangeDetectorRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { SaveConfirmation, CancelConfirmation } from '../common/confirmation';
import { ReviewRequestPayload } from '../modules/review/review-request.payload';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewItemComponent implements OnInit {
  public formDataAdd = new FormData();
  @Input() id: string;
  @Input() createdAt: string;
  @Input() name: string;
  @Input() imageSource: string;
  @Input() content: string;
  @Input() rating: string;
  @Input() status: string;
  @Input() avatar: any = 'assets/img/cf_bg1.jpg';
  @Input() service: HttpService;
  @Input() userName: string;
  public formDisplay = false;
  public loaded = false;
  public reviewContent: string;
  public reviewStatus: boolean;
  public reviewAdd: any = {};
  public dataSource: any = {};
  public likedUsers = [];
  public liked = false;
  public likes = 0;
  input: any = {};
  @Output() event = new EventEmitter<boolean>();
  @Input() item: any = {};
  constructor(private sanitizer: DomSanitizer, private router: Router, private noti: NotificationService, private cdr: ChangeDetectorRef, public authService: AuthService, private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.loaded = false;
    this.service.selectById(this.id).subscribe(res => {
      this.input = res;
      this.item = res;
      this.likes = res.likes;
      this.likedUsers = res.likedUsers;
      if (this.likedUsers.findIndex(x => x == this.authService.getUserId()) > -1) {
        this.liked = true;
      }
      let temp = [];
      if (this.item.imageDirectories && this.item.imageDirectories.length > 0) {
        this.item.imageDirectories.forEach(e => {

          temp.push(e);
          // reader.readAsDataURL(new Blob(e.imagePath]));
        });
      }
      if (this.item && this.item.avatarPath) {
        this.avatar = this.item.avatarPath;
      }
      this.item.images = temp;
      if (this.item.images) {
        this.item.image = this.item.images[0];
      }
      this.loaded = true;
    });


  }
  /**
   * unlike event
   */
  public onBtnUnLikeClick() {
    if (this.item.id) {
      this.reviewService.like(this.item).subscribe(res => {
        this.liked = false;
        this.likes--;
        this.likedUsers = res.likedUsers;
        this.cdr.detectChanges();
      }
      )

    }
  }
  /**
   * like event
   */
  public onBtnLikeClick() {
    if (this.item.id) {
      this.reviewService.like(this.item).subscribe(res => {
        this.liked = true;
        this.likes++;
        this.likedUsers = res.likedUsers;
        this.cdr.detectChanges();
      }
      )

    }
  }
  /**
   * go to user by id
   * @param id user is
   */
  public goToUser(id: string) {
    if (id == this.authService.getUserId()) {
      this.router.navigate(['/app/user']);

    }
    else {
      this.router.navigate(['/app/user/user-view', id]);

    }
  }
  /**
   * go to shop item based on id
   * @param id shop id
   */
  public goToShopItem(id: string) {
    this.router.navigate(['/app/shop/shop-item', id]);
  }

  /**
   * delete review id
   * @param id delete review by id
   */
  public onBtnDeleteClick(id) {
    this.service.delete(id).subscribe(res => {
      this.noti.showSuccess();
      this.event.emit(true);
    })

  }
  public calculateTime(createdAt: string) {
    let startDate = new Date(createdAt);
    let endDate = new Date();
    var startsec = startDate.getSeconds();
    var endsec = endDate.getSeconds();
    var starthour = startDate.getHours();
    var endhour = endDate.getHours();
    var startmonth = startDate.getMonth();
    var endmonth = endDate.getMonth();
    var startday = startDate.getDate();
    var endday = endDate.getDate();
    var startyear = startDate.getUTCFullYear();
    var endyear = endDate.getUTCFullYear();
    var startminute = startDate.getMinutes();
    var endminute = endDate.getMinutes();
    if (endyear - startyear > 1) {
      return (endyear - startyear) + " yrs ago";
    }
    else if (endyear - startyear > 0) {
      return (endyear - startyear) + " yr ago";
    }
    else if (endmonth - startmonth > 1) {
      return (endmonth - startmonth) + " months ago";
    }
    else if (endmonth - startmonth > 0) {
      return (endmonth - startmonth) + " month ago";
    }

    else if (endday - startday > 1) {
      return (endday - startday) + " days ago";
    }
    else if (endday - startday > 0) {
      return (endday - startday) + " day ago";
    }

    else if (endhour - starthour > 1) {
      return (endhour - starthour) + " hours ago";
    }
    else if (endhour - starthour > 0) {
      return (endhour - starthour) + " hour ago";
    }
    else if (endminute - startminute > 1) {
      return (endminute - startminute) + " minutes ago";
    }
    else if (endminute - startminute > 0) {
      return (endminute - startminute) + " minute ago";
    }
    else if (endsec - startsec > 1) {
      return (endsec - startsec) + " secs ago";
    }
    else if (endsec - startsec > 0) {
      return (endsec - startsec) + " sec ago";
    }
  }

  public editReview() {
    this.input = {};
    this.input = { ...this.item };
    this.input.image = null;
    this.formDisplay = true;
  }
  
  public upload(event: any) {
    this.formDataAdd = event;
  }
}

