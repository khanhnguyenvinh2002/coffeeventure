import { NotificationService } from './../../module/sticky/common/notification/notification.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { JournalService } from 'src/app/module/sticky/modules/journal/journal.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {
  public journalContent: string;
  public journalStatus: boolean;
  public journalAdd: any = {};
  // allDatesModel: any[] = [{ year: 2021, month: 3, day: 19 }, { year: 2021, month: 3, day: 18 }, { year: 2021, month: 3, day: 20 }];
  date: { year: number, month: number };

  selectedFile: File = null;
  public imageUrl = 'assets/img/cf_bg1.jpg';
  constructor(private http: HttpClient, private calendar: NgbCalendar, private journalService: JournalService) { }

  ngOnInit(): void {
  }
  daysSelected: any[] = [];
  event: any;

  isSelected = (event: any) => {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    return this.daysSelected.find(x => x == date) ? "selected" : null;
  };

  select(event: any, calendar: any) {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    const index = this.daysSelected.findIndex(x => x == date);
    if (index < 0) this.daysSelected.push(date);
    else this.daysSelected.splice(index, 1);

    calendar.updateTodaysDate();
  }
  // handleFileInput(file: FileList) {
  //   this.fileUpload = file.item(0);
  //   var reader = new FileReader();
  //   reader.onload = (event: any) => {
  //     this.imageUrl = event.target.result;
  //   }
  //   reader.readAsDataURL(this.fileUpload);
  // }
  public onBtnSaveJournal() {
    this.journalAdd.content = this.journalContent;
    if (this.journalStatus == true) {
      this.journalAdd.status = 1;
    }
    if (this.journalStatus == false) {
      this.journalAdd.status = 0;
    }
    this.journalAdd.created = new Date();
    this.journalService.insert(this.journalAdd).subscribe(res => {
      this.journalContent = "";
      this.journalStatus = false;
    })
  }

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
