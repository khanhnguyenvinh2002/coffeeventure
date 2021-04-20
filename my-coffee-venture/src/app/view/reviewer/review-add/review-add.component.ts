import { BaseFormComponent } from 'src/app/module/sticky/component';
import { ShopService } from './../../../module/sticky/modules/shop/shop.service';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { SaveConfirmation, CancelConfirmation } from 'src/app/module/sticky/common/confirmation';
import { NotificationService } from 'src/app/module/sticky/common/notification/notification.service';
import { AuthService } from 'src/app/module/sticky/modules/auth/auth.service';
import { ReviewService } from 'src/app/module/sticky/modules/review/review.service';
import { ReviewRequestPayload } from 'src/app/module/sticky/modules/review/review-request.payload';
import { UserService } from 'src/app/module/sticky/modules/user/user.service';

@Component({
  selector: 'app-review-add',
  templateUrl: './review-add.component.html',
  styleUrls: ['./review-add.component.css']
})
export class ReviewAddComponent extends BaseFormComponent implements OnInit {
  @ViewChild('form', { static: true }) form: NgForm;
  @Input() input: any = {};
  @Input() formDisplay = false;
  @Input() title = "Add review";
  public rating: number = 3;
  request = new ReviewRequestPayload();
  public formDataAdd = new FormData();
  public reviewContent: string;
  public reviewStatus: boolean;
  public reviewAdd: any = {};
  @Input() viewMode = false;
  @Output() event: EventEmitter<boolean> = new EventEmitter<boolean>();
  public data: any = {};


  constructor(private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer, public shopService: ShopService, public reviewService: ReviewService, private noti: NotificationService, private authService: AuthService, private userService: UserService) { super(); }
  ngOnInit(): void {
    this.data.id = this.input.shopId;
    this.rating = this.input.rating ? this.input.rating : 3;
    this.input.content = this.input.content ? this.input.content : "";

    if (this.input.status != 0) {
      this.reviewStatus = true;
    }
    if (this.input.status == 0) {
      this.reviewStatus = false;
    }
    setTimeout(() => {
      this.form.form.markAsPristine();
    }, 0);
  }


  public onBtnAddReview(): void {

    if (this.form) {
      if (!this.validateForm(this.form, 'review-edit')) {
        return;
      }
      if (this.form.form.dirty) {
        const save = new SaveConfirmation();
        save.accept = () => {
          if (this.reviewStatus == true) {
            this.input.status = 1;
          }
          if (this.reviewStatus == false) {
            this.input.status = 0;
          }
          this.input.rating = this.rating;
          this.reviewService.merge(this.input).subscribe(event => {
            this.reviewService.uploadReviewImages(event.id, this.formDataAdd).subscribe(
              res => {
                this.noti.showSuccess();
                this.reviewContent = "";
                this.reviewStatus = false;
                this.input = {};
                this.formDisplay = false;
                setTimeout(() => {
                  this.form.form.markAsPristine();
                }, 0);
                this.event.emit(true);
                this.cdr.detectChanges();
              }
            )
          });

        };
        this.noti.confirm(save);
      } else {
        this.formDisplay = false;
        this.event.emit(true);
        setTimeout(() => {
          this.form.form.markAsPristine();
        }, 0);
        this.cdr.detectChanges();
      }
    }
    this.cdr.detectChanges();
  }

  upload(event: any) {
    this.formDataAdd = event;
  }
  /**
   * Pop up form cancel
   */
  public onBtnCancelReview(): void {
    if (this.form.form.dirty) {
      const cancelConfirmation = new CancelConfirmation();
      cancelConfirmation.accept = () => {
        this.formDisplay = false;
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
    this.event.emit(true);
    this.formDataAdd = new FormData();
  }

}
