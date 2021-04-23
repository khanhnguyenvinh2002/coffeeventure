import { ReviewRequestPayload } from './../../../module/sticky/modules/review/review-request.payload';
import { ReviewService } from 'src/app/module/sticky/modules/review/review.service';
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
  public profileImage: string;
  public category: any;
  public district: any;
  public shopRequest = new ShopRequestPayload();
  public similarCategory: any;
  public similarDistrict: any;
  public loaded = false;
  public loadedCategory = false;
  public loadedDistrict = false;
  public formDisplay = false;
  public input: any = {};
  public images: any = [];
  private sub: any;
  public shopItem: any = {};
  public userShopRequest = new UserShopRequestPayload();
  public reviewRequest = new ReviewRequestPayload();
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
  public allItems = false;
  public stopScroll = false;
  public isLoaded = false;
  public data: any;
  constructor(private route: ActivatedRoute, private router: Router, private noti: NotificationService, private userShopService: UserShopService, private shopService: ShopService, private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer, public authService: AuthService, public reviewService: ReviewService) { super(); }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.loaded = false;
      // this.id = +params['id']; // (+) converts string 'id' to a number
      this.id = params['id'];
      this.shopService.selectById(this.id).subscribe(res => {
        this.shopItem = res;
        // const reader = new FileReader();
        // reader.onload = (e) => this.dataSource.items.image = e.target.result;
        if (res && res.imageDirectories && res.imageDirectories.length > 0) {
          res.imageDirectories.forEach(e => {
            this.images.push(e);
          });
        }
        this.profileImage = this.images ? this.images[0] : "";
        if (this.shopItem && this.shopItem.shopCategory && this.shopItem.shopCategory.length > 0) {
          let temp = this.shopItem.shopCategory[0].id;
          this.category = this.shopItem.shopCategory[0].name;
          this.initShopByCategory(temp);

        }
        if (this.shopItem && this.shopItem.district) {
          let temp = this.shopItem.district;
          this.district = temp;
          this.initShopByDistrict(temp);

        }
        this.loaded = true;
        if (this.cd && !this.cd['destroyed']) {
          this.cdr.detectChanges();
        }
      })
      this.initData();
    });

  }
  initData() {
    this.reviewRequest.pageIndex = 0;
    this.reviewRequest.pageSize = 3;
    this.reviewRequest.shopId = this.id;
    this.reviewService.selectReviewsByShop(this.reviewRequest).subscribe(res => {
      this.data = res;
      if (this.data) {
        this.data.forEach(element => {
          if (element.length == 0) {
            this.allItems = true;
            return;
          }
          let temp = [];
          if (element.imageDirectories && element.imageDirectories.length > 0) {
            element.imageDirectories.forEach(e => {
              temp.push(e);
            });
            element.images = temp;
            if (element.images) {
              element.image = element.images[0];
            }
          }
          this.cdr.detectChanges();
        });

      }
      this.stopScroll = false;
      this.allItems = false;
    });

  }

  onScrollDown() {
    if (this.stopScroll == true || this.allItems == true) {
      this.isLoaded = true;
      return
    }
    this.isLoaded = false;
    this.reviewRequest.pageIndex++;
    this.reviewRequest.shopId = this.id;
    this.reviewService.selectReviewsByShop(this.reviewRequest).subscribe(res => {
      if (res.length == 0) {
        this.allItems = true;
        return;
      }
      res.forEach(element => {
        let temp = [];
        if (element.imageDirectories && element.imageDirectories.length > 0) {
          element.imageDirectories.forEach(e => {
            temp.push(e);
            // reader.readAsDataURL(new Blob(e.imagePath]));
          });
          element.images = temp;
        }
      });
      this.isLoaded = true;
      this.data =
        this.data = this.data ? this.data.concat(res) : res;
    });
  }
  goToShopItem(id: string) {
    this.router.navigate(['/app/shop/shop-item', id]);
  }
  public initShopByDistrict(district: string): void {
    this.shopRequest = new ShopRequestPayload();
    this.shopRequest.excludeIds = [];
    this.shopRequest.excludeIds.push(this.shopItem.id);
    this.shopRequest.districts = [];
    this.shopRequest.districts.push(district);
    this.loadedDistrict = false;
    this.shopService.select(this.shopRequest).subscribe(
      (response: any) => {
        this.similarDistrict = response;
        if (this.similarDistrict && this.similarDistrict.length > 0) {
          this.similarDistrict.forEach(e => {
            e.image = e.imagePath;
          });

        }
        this.loadedDistrict = true;
        if (this.cd && !this.cd['destroyed']) {
          this.cdr.detectChanges();
        }
      });
  }
  public initShopByCategory(id: string): void {
    this.shopRequest = new ShopRequestPayload();
    this.shopRequest.excludeIds = [];
    this.shopRequest.excludeIds.push(this.shopItem.id);
    this.shopRequest.categoryIds = [];
    this.shopRequest.categoryIds.push(id);
    this.loadedCategory = false;
    this.shopService.select(this.shopRequest).subscribe(
      (response: any) => {

        this.similarCategory = response;
        if (this.similarCategory && this.similarCategory.length > 0) {
          this.similarCategory.forEach(e => {
            e.image = e.imagePath;
          });
        }
        this.loadedCategory = true;
        if (this.cd && !this.cd['destroyed']) {
          this.cdr.detectChanges();
        }
      });

  }

  onReviewAdd() {
    this.input = {};
    this.input.content = "";
    this.input.shopId = this.id;
    this.input.shopName = this.shopItem.name;
    this.formDisplay = true;
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

  onUploadEvent(event) {
    this.formDisplay = false;
    if (event) {
      this.initData();
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
