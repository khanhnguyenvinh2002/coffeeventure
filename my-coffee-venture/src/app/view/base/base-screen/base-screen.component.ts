import { JournalService } from './../../../module/sticky/modules/journal/journal.service';
import { Component, OnInit } from '@angular/core';
import * as main from "./base-screen.config";
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-base-screen',
  templateUrl: './base-screen.component.html',
  styleUrls: ['./base-screen.component.css']
})
export class BaseScreenComponent implements OnInit {
  public headerJournal = main.BASE_JOURNAL;
  public shops = [
    { id: "Dec19_1", image: "Dec_26_2019.jpeg", header: "Dec 26 2019", class: "img-ver", content: "Đưa em hâm đi chơi phố" },
    { id: "Dec19_2", image: "Dec_31_2019.jpeg", header: "Dec 31 2019", class: "img-ver", content: "Đưa em hâm đi countdown" },
    { id: "Jan20_1", image: "Jan_14_2020.jpeg", header: "Jan 14 2020", class: "img-ver", content: "Đưa em hâm đi cafe" },
    { id: "Jan20_2", image: "Jan_18_2020.jpeg", header: "Jan 18 2020", class: "img-ver", content: "Đưa em hâm đi prom" },
    { id: "Feb20", image: "Feb_7_2020.jpeg", header: "Feb 7 2020", class: "img-ver", content: "Đưa em hâm đi hồ Giảng Võ" },
    { id: "Mar20_1", image: "Mar_4_2020.jpeg", header: "Mar 4 2020", class: "img-ver", content: "Đưa em hâm đi đánh răng" },
    { id: "Mar20_2", image: "May_22_2020.jpeg", header: "May 22 2020", class: "img-ver", content: "Đưa em hâm đi chụp ảnh phông đỏ" },
    { id: "Jun20", image: "Jun_14_2020.jpeg", header: "Jun 14 2020", class: "img-ver", content: "Đưa em hâm đi chụp kỉ yếu với lớp" },
    { id: "Jul20_1", image: "Jul_7_2020.jpeg", header: "Jul 7 2020", class: "img-ver", content: "Đưa em hâm đi ngắm sen Hồ Tây" },
    { id: "Jul20_2", image: "Jul_23_2020.jpeg", header: "Jul 23 2020", class: "img-ver", content: "Đưa em hâm đi ship nhãn" },
    { id: "Aug20", image: "Aug_21_2020.jpeg", header: "Aug 21 2020", class: "img-ver", content: "Đưa em hâm đi đâu chẳng bít" },
    { id: "Oct20_1", image: "Oct_1_2020.jpeg", header: "Oct 1 2020", class: "img-ver", content: "Đưa em hâm đi ngắm đèn lòn" },
    { id: "Oct20_2", image: "Oct_10_2020.jpeg", header: "Oct 10 2020", class: "img-ver", content: "Đưa em hâm đi sắm áo đôi" },
    { id: "Oct20_3", image: "Oct_20_2020.jpeg", header: "Oct 20 2020", class: "img-ver", content: "Đưa em hâm đi ăn sinh nhật anh bíu" },
    { id: "Nov20", image: "Nov_27_2020.jpeg", header: "Nov 27 2020", class: "img-ver", content: "Đưa em hâm đi mua áo đôi nhưng mà không mua" },
    { id: "Dec20", image: "Dec_30_2020.jpeg", header: "Dec 30 2020", class: "img-ver", content: "Đưa em hâm đi ma di ót ăn bằng tiền mẹ em" },
    { id: "Jan21", image: "Jan_16_2021.jpeg", header: "Jan 16 2021", class: "img-ver", content: "Đưa em hâm đi ngắm mũ" },
    { id: "Feb21", image: "Feb_9_2021.jpeg", header: "Feb 9 2021", class: "img-ver", content: "Đưa em hâm đi làm cứt" },
    { id: "Mar21", image: "Mar_6_2021.jpeg", header: "Mar 6 2021", class: "img-ver", content: "Đưa bữa tối đi ăn bữa trưa" },];
  constructor(private journalService: JournalService) { }

  ngOnInit(): void {
    this.journalService.getAll().subscribe(res => {
      for (let i = 0; i < 4; i++) {
        this.headerJournal[i].content = res[i] ? res[i].content : this.headerJournal[i].content;
        this.headerJournal[i].date = res[i] ? res[i].created : this.headerJournal[i].date;
      }
    });
  }

  // public formatDate(date): string {
  //   if (date) {
  //     return date.getFullYear()
  //       + '-' + this.leftpad(date.getMonth() + 1, 2)
  //       + '-' + this.leftpad(date.getDate(), 2)
  //       + ' ' + this.leftpad(date.getHours(), 2)
  //       + ':' + this.leftpad(date.getMinutes(), 2)
  //       + ':' + this.leftpad(date.getSeconds(), 2);
  //   }
  // }

  private leftpad(val, resultLength = 2, leftpadChar = '0'): string {
    return (String(leftpadChar).repeat(resultLength)
      + String(val)).slice(String(val).length);
  }
}
