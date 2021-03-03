import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reviewer',
  templateUrl: './reviewer.component.html',
  styleUrls: ['./reviewer.component.css']
})
export class ReviewerComponent implements OnInit {
  selectedFile: File = null;
  public imageUrl = 'assets/img/cf_bg1.jpg';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  // handleFileInput(file: FileList) {
  //   this.fileUpload = file.item(0);
  //   var reader = new FileReader();
  //   reader.onload = (event: any) => {
  //     this.imageUrl = event.target.result;
  //   }
  //   reader.readAsDataURL(this.fileUpload);
  // }
  handleFileInput(event) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      }
    }
  }
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }
  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post('', fd, {
      reportProgress: true,
      observe: 'events'
    }
    ).subscribe(e => {
      if (e.type === HttpEventType.UploadProgress) {
        console.log('Upload Progress: ' + Math.round(e.loaded / e.total * 100))
          ;
      } else if (e.type === HttpEventType.Response) {
        console.log(e);
      }
    })
  }
}
