import { HttpService } from 'src/app/module/sticky/common/http/http.service';
import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() id: string;
  @Input() createdAt: string;
  @Input() name: string;
  @Input() imageSource: string;
  @Input() content: string;
  @Input() feeling: string;
  @Input() status: string;
  @Input() image: any;
  @Input() service: HttpService;
  @Input() userName: string;

  public item: any = {};
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.service.selectById(this.id).subscribe(res => {
      console.log(res);
      this.item = res;
      let temp = [];
      if (this.item.imagePaths && this.item.imagePaths.length > 0) {
        this.item.imagePaths.forEach(e => {
          let objectURL = 'data:image/jpeg;base64,' + e;
          temp.push(this.sanitizer.bypassSecurityTrustResourceUrl(objectURL));
          // reader.readAsDataURL(new Blob(e.imagePath]));
        });
        this.item.images = temp;
        if (this.item.images) {
          this.item.image = this.item.images[0];
        }
      }
    });


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

}
