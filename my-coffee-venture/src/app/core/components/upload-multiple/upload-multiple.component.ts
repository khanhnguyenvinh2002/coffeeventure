import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/core/base/common/notification/notification.service';

@Component({
  selector: 'app-upload-multiple',
  templateUrl: './upload-multiple.component.html',
  styleUrls: ['./upload-multiple.component.css']
})
export class UploadMultipleComponent implements OnInit {
  public progress: number;
  public message: string;
  public formData = new FormData();
  public imageUrls: string[] = ['assets/img/cf_bg1.jpg'];
  @Output() public onFileLoad = new EventEmitter<FormData>();
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient, private noti: NotificationService) {
    // this.formData = new FormData();
  }

  ngOnInit() {
  }
  /**
   * 
   * @param files 
   * @returns emit to the parent the file
   */
  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let filesToUpload: File[] = files;

    Array.from(filesToUpload).map((file, index) => {
      return this.formData.append('file' + index, file, file.name);
    });
    this.onFileLoad.emit(this.formData);
  }
  /**
   * 
   * @param event handle image
   */
  public handleFileInput(event) {
    if (event.target.files && event.target.files[0]) {
      this.imageUrls = [];
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          this.imageUrls.push(event.target.result);
          this.noti.showMessage("Images have been loaded");
        }

        reader.readAsDataURL(event.target.files[i]);
      }
      setTimeout(() => {
        this.uploadFile(event.target.files)
      }, 0);
    }
  }
}
