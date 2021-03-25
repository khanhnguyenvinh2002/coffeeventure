import { NotificationService } from './../../../module/sticky/common/notification/notification.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { ImageService } from 'src/app/module/sticky/modules/image/image.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  public progress: number;
  public message: string;
  public imageUrl = 'assets/img/cf_bg1.jpg';
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient, private imageService: ImageService, private noti: NotificationService) { }

  ngOnInit() {
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let filesToUpload: File[] = files;
    const formData = new FormData();

    Array.from(filesToUpload).map((file, index) => {
      return formData.append('file' + index, file, file.name);
    });
    this.imageService.upload(formData)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.noti.showMessage("Loading");
        // this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.noti.showSuccess();
          // this.message = 'Upload success.';
          // this.imageUrl = event.path ? event.path : this.imageUrl;
          // this.onUploadFinished.emit(event.body);
        }
      });
  }
  handleFileInput(event) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        // this.imageUrl = event.target.result;
      }
    }
  }
}