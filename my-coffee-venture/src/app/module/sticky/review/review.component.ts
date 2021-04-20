import { ReviewService } from '../modules/review/review.service';
import { AuthService } from '../modules/auth/auth.service';
import { NotificationService } from '../common/notification/notification.service';
import { HttpService } from 'src/app/module/sticky/common/http/http.service';
import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit, ChangeDetectorRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { SaveConfirmation, CancelConfirmation } from '../common/confirmation';

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
  @Input() avatar: any;
  @Input() service: HttpService;
  @Input() userName: string;
  public formDisplay = false;
  public loaded = false;
  public reviewContent: string;
  public reviewStatus: boolean;
  public reviewAdd: any = {};
  public dataSource: any = {};
  input: any = {};
  @Output() event = new EventEmitter<boolean>();
  @Input() item: any = {};
  constructor(private sanitizer: DomSanitizer, private noti: NotificationService, private cdr: ChangeDetectorRef, public authService: AuthService, private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.loaded = false;
    this.service.selectById(this.id).subscribe(res => {
      this.input = res;
      this.item = res;
      let temp = [];
      if (this.item.imagePaths && this.item.imagePaths.length > 0) {
        this.item.imagePaths.forEach(e => {
          let objectURL = 'data:image/jpeg;base64,' + e;
          temp.push(this.sanitizer.bypassSecurityTrustResourceUrl(objectURL));
          // reader.readAsDataURL(new Blob(e.imagePath]));
        });
      }
      if (this.item && this.item.avatarPath) {
        this.avatar = 'data:image/jpeg;base64,' + this.item.avatarPath;
      }
      this.item.images = temp;
      if (this.item.images) {
        this.item.image = this.item.images[0];
      }
      this.loaded = true;
    });


  }
  onBtnDeleteClick(id) {
    this.service.delete(id).subscribe(res => {
      this.noti.showSuccess();
      this.event.emit(true);
    })

  }
  calculateTime(createdAt: string) {
    let startDate = new Date(createdAt);
    let endDate = new Date();
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
  }
  editReview() {
    this.input = {};
    this.input = { ...this.item };
    this.input.image = null;
    this.formDisplay = true;
  } upload(event: any) {
    this.formDataAdd = event;
  }
}

