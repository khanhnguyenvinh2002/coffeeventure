import { AuthService } from './../../../module/sticky/modules/auth/auth.service';
import { NotificationService } from './../../../module/sticky/common/notification/notification.service';
import { UserShopRequestPayload } from './../../../module/sticky/modules/user-shop/user-shop-request.payload';
import { UserShopService } from './../../../module/sticky/modules/user-shop/user-shop.service';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BaseListComponent } from 'src/app/module/sticky/component';
import { forkJoin, Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-shop-saved',
  templateUrl: './shop-saved.component.html',
  styleUrls: ['./shop-saved.component.css']
})
export class ShopSavedComponent implements OnInit, OnDestroy {

  public subscriptions: Subscription[] = [];
  public userShopRequest = new UserShopRequestPayload();
  public userName: string;
  public dataSource: any = {};
  public cols = [
    { width: '50px', header: 'USER.SAVED.NO' },
    { width: '100px', header: 'USER.SAVED.NAME' },
    { width: '300px', header: 'USER.SAVED.ADDRESS' },
    { width: '200px', header: 'USER.SAVED.CATEGORY' },
    { width: '70px', header: '', maxWidth: '50px', class: 'action' },
  ];

  constructor(public userShopService: UserShopService, private authService: AuthService, private cd: ChangeDetectorRef, private router: Router, private noti: NotificationService) { }

  ngOnInit(): void {
    this.initData();
  }

  public onPageChange(event: PageEvent) {
    this.userShopRequest.pageIndex = event.pageIndex;
    this.userShopRequest.pageSize = event.pageSize;
    this.initData();
  }
  public initData() {
    const $selectAndCount = [
      this.userShopService.select(this.userShopRequest),
      this.userShopService.count(this.userShopRequest)];

    const sub = forkJoin($selectAndCount).subscribe(
      (response: any[]) => {

        this.userName = this.authService.getUser();
        this.dataSource.items = response[0];
        this.dataSource.paginatorTotal = response[1];

        if (this.cd && !this.cd['destroyed']) {
          this.cd.detectChanges();
        }
      });

    this.cd.detectChanges();
    this.subscriptions.push(sub);
    this.cd.detectChanges();
  }
  public viewShop(id: any) {
    this.router.navigate([`apps/shop/shop-item/${id}`]);
  }
  public onBtnDeleteClick(id) {
    this.userShopRequest.shopId = id;
    this.userShopService.deleteShopFromUser(this.userShopRequest).subscribe(res => {
      this.noti.showSuccess();
      this.userShopRequest = new UserShopRequestPayload();
      this.initData();
      this.cd.detectChanges();
    })
  }
  ngOnDestroy() {
    this.subscriptions.forEach(e => e.unsubscribe());
  }
}
