import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, ElementRef } from '@angular/core';
import { WINDOW } from './module/sticky/services/window.service';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-coffee-venture';
  constructor(private primengConfig: PrimeNGConfig, private elementRef: ElementRef) { }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#cee8f0';
    // this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'rgb(193,221,232)';
  }
  ngOnInit() {
    this.primengConfig.ripple = true;
  }
  onActivate(event) {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 2);

  }
}

