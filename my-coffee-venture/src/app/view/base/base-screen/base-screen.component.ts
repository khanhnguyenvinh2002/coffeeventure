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
  constructor() { }

  ngOnInit(): void {
  }

}
