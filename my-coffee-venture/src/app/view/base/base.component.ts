// import { BaseListComponent } from './../../module/sticky/component/base-list.component';
import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/module/sticky/modules/auth/auth.service';
import { WINDOW } from 'src/app/module/sticky/services/window.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
  public id: number;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
    public authService: AuthService, private router: Router
  ) {
    // window.addEventListener('scroll', this.scroll, true);
  }

  ngOnInit(): void {
  }

  // public myWindow = window.open("", "myWin");

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const offset = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    if (offset > 200) {
      this.id = 1;
    }
    else {
      this.id = 2;
    }
  }
  onBtnRegister() {
    this.router.navigate(['login']);
  }
  onBtnLogin() {
    this.router.navigate(['login']);
  }
  onBtnLogout() {
    this.authService.logout();
  }
}
  // scroll = (event) => {
  //   if (this.myWindow.screenY > 200) {
  //     this.id = 1;
  //   }
  //   else {
  //     this.id = 2;
  //   }
  // }

