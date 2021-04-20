import { JournalService } from './../modules/journal/journal.service';
import { AuthService } from './../modules/auth/auth.service';
import { NotificationService } from './../common/notification/notification.service';
import { HttpService } from 'src/app/module/sticky/common/http/http.service';
import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit, ChangeDetectorRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { SaveConfirmation, CancelConfirmation } from '../common/confirmation';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @ViewChild('form', { static: true }) form: NgForm;
  public formDataAdd = new FormData();
  @Input() id: string;
  @Input() createdAt: string;
  @Input() name: string;
  @Input() imageSource: string;
  @Input() content: string;
  @Input() feeling: string;
  @Input() status: string;
  @Input() avatar: any;
  @Input() service: HttpService;
  @Input() userName: string;
  public itemAdd: any;
  public formDisplay = false;
  public loaded = false;
  public journalContent: string;
  public journalStatus: boolean;
  public journalAdd: any = {};
  public dataSource: any = {};
  @Output() event = new EventEmitter<boolean>();
  public item: any = {};
  constructor(private sanitizer: DomSanitizer, private noti: NotificationService, private cdr: ChangeDetectorRef, public authService: AuthService, private journalService: JournalService) { }

  ngOnInit(): void {
    this.loaded = false;
    this.service.selectById(this.id).subscribe(res => {
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
    this.itemAdd = {};
    this.itemAdd.feeling = this.item.feeling ? this.item.feeling : "";

    if (this.item.status == 1) {
      this.journalStatus = true
    }
    if (this.item.status == 0) {
      this.journalStatus = false;
    }
    this.itemAdd.status = this.item.status ? this.item.status : "";
    this.itemAdd.content = this.item.content ? this.item.content : "";
    this.itemAdd.id = this.item.id;


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

  editJournal() {
    this.itemAdd = {};
    this.itemAdd.feeling = this.item.feeling ? this.item.feeling : "";

    if (this.item.status == 1) {
      this.journalStatus = true;
    }
    if (this.item.status == 0) {
      this.journalStatus = false;
    }
    this.itemAdd.status = this.item.status ? this.item.status : "";
    this.itemAdd.content = this.item.content ? this.item.content : "";
    this.itemAdd.id = this.item.id;
    setTimeout(() => {
      this.form.form.markAsPristine();
    }, 0);
    this.formDisplay = true;
  }

  public onBtnAddJournal(): void {
    if (this.form.form.dirty) {
      const save = new SaveConfirmation();
      save.accept = () => {
        if (this.journalStatus == true) {
          this.itemAdd.status = 1;
        }
        if (this.journalStatus == false) {
          this.itemAdd.status = 0;
        }
        this.journalService.merge(this.itemAdd).subscribe(event => {
          this.journalService.uploadJournalImages(event.id, this.formDataAdd).subscribe(
            res => {
              this.noti.showSuccess();
              this.journalContent = "";
              this.journalStatus = false;
              this.itemAdd = {};
              this.formDisplay = false;
              setTimeout(() => {
                this.form.form.markAsPristine();
              }, 0);
              this.cdr.detectChanges();
            }
          )
        });

      };
      this.noti.confirm(save);
    } else {
      this.formDisplay = false;
      this.journalStatus = false;
      this.itemAdd = {};
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
        this.itemAdd = {};
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
  upload(event: any) {
    this.formDataAdd = event;
  }
}
