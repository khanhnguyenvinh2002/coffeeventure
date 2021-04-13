import { UserRequestPayload } from './../../../module/sticky/modules/user/user-request.payload';
import { AuthService } from './../../../module/sticky/modules/auth/auth.service';
import { NotificationService } from 'src/app/module/sticky/common/notification/notification.service';
import { ShopComponent } from './../shop.component';
import { BaseListComponent } from 'src/app/module/sticky/component/base-list.component';
import { ShopService } from 'src/app/module/sticky/modules/shop/shop.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ShopRequestPayload } from 'src/app/module/sticky/modules/shop/shop-request.payload';
import { DomSanitizer } from '@angular/platform-browser';
import { UserShopService } from 'src/app/module/sticky/modules/user-shop/user-shop.service';
import { UserShopRequestPayload } from 'src/app/module/sticky/modules/user-shop/user-shop-request.payload';
@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.css']
})
export class ShopItemComponent extends BaseListComponent implements OnInit {
  id: string;
  public userShop: any = {};
  profileImage: string;
  category: any;
  public shopRequest = new ShopRequestPayload(); similarCategory: any;
  public loaded = false;
  public loadedShop = false;
  images: any = [];
  private sub: any;
  public shopItem: any = {};
  public userShopRequest = new UserShopRequestPayload();
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  responsiveOptions2 = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '900px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];
  constructor(private route: ActivatedRoute, private router: Router, private noti: NotificationService, private userShopService: UserShopService, private shopService: ShopService, private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer, public authService: AuthService) { super(); }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.loaded = false;
      // this.id = +params['id']; // (+) converts string 'id' to a number
      this.id = params['id'];
      this.shopService.selectById(this.id).subscribe(res => {
        this.shopItem = res;
        // const reader = new FileReader();
        // reader.onload = (e) => this.dataSource.items.image = e.target.result;
        res.imagePaths.forEach(e => {
          let objectURL = 'data:image/jpeg;base64,' + e;
          this.images.push(this.sanitizer.bypassSecurityTrustResourceUrl(objectURL));
          // reader.readAsDataURL(new Blob(e.imagePath]));
        });
        this.profileImage = this.images ? this.images[0] : "";
        if (this.shopItem && this.shopItem.shopCategory && this.shopItem.shopCategory.length > 0) {
          let temp = this.shopItem.shopCategory[0].id;
          this.category = this.shopItem.shopCategory[0].name;
          this.initShopByCategory(temp);

        }
        this.loaded = true;
        if (this.cd && !this.cd['destroyed']) {
          this.cdr.detectChanges();
        }
      })
    });
  }
  goToShopItem(id: string) {
    this.router.navigate(['/app/shop/shop-item', id]);
  }
  public initShopByCategory(id: string): void {
    this.shopRequest.categoryIds = [];
    this.shopRequest.categoryIds.push(id);
    this.loadedShop = false;
    this.shopService.select(this.shopRequest).subscribe(
      (response: any[]) => {
        this.similarCategory = response;
        // const reader = new FileReader();
        // reader.onload = (e) => this.dataSource.items.image = e.target.result;
        this.similarCategory.forEach(e => {
          let objectURL = 'data:image/jpeg;base64,' + e.imagePath;
          e.image = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
          // reader.readAsDataURL(new Blob(e.imagePath]));
        });
        this.loadedShop = true;
        if (this.cd && !this.cd['destroyed']) {
          this.cdr.detectChanges();
        }
      });
  }
  saveShop(event: boolean) {
    if (event) {
      this.userShop = {};
      this.userShop.id = this.id;
      this.userShopService.insert(this.userShop).subscribe(res => {
        this.noti.showSuccess();
      })
    }
    else {
      this.userShopRequest.shopId = this.id;
      this.userShopService.deleteShopFromUser(this.userShopRequest).subscribe(res => {
        this.noti.showSuccess();
      })
    }
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
