import { NotificationService } from '../../base/common/notification/notification.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { ImageService } from 'src/app/core/module/partial/modules/image/image.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  public progress: number;
  public message: string;
  public formData = new FormData();
  public imageUrl: string = '';
  @Input() preview = false;
  @Output() public onFileLoad = new EventEmitter<FormData>();
  @Output() public onReadImage = new EventEmitter<string>();
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient, private noti: NotificationService) {
    // this.formData = new FormData();
  }

  ngOnInit() {
  }
  /**
   * 
   * @param files upload
   * @returns 
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
   * reset data
   */
  public reset() {
    this.formData = new FormData();
    this.imageUrl = "";
    this.preview = false;
  }
  /**
   * 
   * @param event handle file
   */
  public handleFileInput(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          this.imageUrl = event.target.result;
          this.onReadImage.emit(this.imageUrl);
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