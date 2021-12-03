
import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { WINDOW } from 'src/app/core/module/partial/services/window.service';

@Component({
  selector: 'app-base-footer',
  templateUrl: './base-footer.component.html',
  styleUrls: ['./base-footer.component.css']
})
export class BaseFooterComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window) {
    // window.addEventListener('scroll', this.scroll, true);
  }

  ngOnInit(): void {
  }

  // public myWindow = window.open("", "myWin");

  // @HostListener("window:scroll", [])
  // returnTop() {
  //   document.body.scrollTop = 0;
  //   document.documentElement.scrollTop = 0;
  // }


}
