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
  constructor(private journalService: JournalService) { }

  ngOnInit(): void {
    this.journalService.getAll().subscribe(res => {
      for (let i = 0; i < 4; i++) {
        this.headerJournal[i].content = res[i] ? res[i].content : this.headerJournal[i].content;
      }
    });
  }

}
