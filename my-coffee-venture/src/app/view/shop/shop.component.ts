import { BaseListComponent } from 'src/app/module/sticky/component/base-list.component';
import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { JournalService } from 'src/app/module/sticky/modules/journal/journal.service';
import { ShopRequestPayload } from 'src/app/module/sticky/modules/shop/shop-request.payload';
import { ShopService } from 'src/app/module/sticky/modules/shop/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent extends BaseListComponent implements OnInit {
  public shopRequest = new ShopRequestPayload();
  public dataSource: any = {};
  // public items: MenuItem[];
  public selectedCities1: any[];
  public districts: any;
  public cities: any;
  public categories: any;
  public loaded = false;
  public streets: any;
  public filteredDistricts: any;
  public filteredStreets: any;
  public stopScrolling = false;
  constructor(private router: Router, public shopService: ShopService, private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer) { super(); }

  ngOnInit(): void {

    this.shopRequest.pageIndex = 0;
    this.shopRequest.pageSize = 6;
    this.initShop();
    this.shopService.selectShopSearch().subscribe(res => {
      this.cities = res.cities;
      this.districts = res.districts;
      this.streets = res.streets;
      this.filteredStreets = res.streets;
      this.filteredDistricts = res.districts;
      this.categories = res.categories;
    })
    // this.shopService.getShopCategory(true).pipe(map(response => {
    //   const treeData = [];
    //   for (const item of response) {
    //     const parentNode: MenuItem = {
    //       label: item.name,
    //       id: item.id,
    //       routerLink: item.link,
    //       expanded: false
    //     };
    //     treeData.push(parentNode);

    //   }
    //   return treeData;
    // })).subscribe(res =>
    //   this.items[0].items = res)
  }
  goToShopItem(id: string) {
    this.router.navigate(['/app/shop/shop-item', id]);
  }
  onScrollDown() {
    if (this.stopScrolling == true) {
      this.loaded = true;
      return
    }
    this.loaded = false;
    this.shopRequest.pageIndex++;
    this.loaded = false;
    this.shopService.select(this.shopRequest).subscribe(
      (response: any) => {
        if (!response || response == [] || response.length == 0) {
          this.stopScrolling = true;
          return;
        }
        response.forEach(e => {
          let objectURL = 'data:image/jpeg;base64,' + e.imagePath;
          e.image = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
        });
        this.loaded = true;
        this.dataSource.items = this.dataSource.items ? this.dataSource.items.concat(response) : response;
      });

  }
  public initShop(): void {
    this.shopRequest.pageIndex = 0;
    this.shopRequest.pageSize = 12;
    this.loaded = false;
    // const $selectAndCount = [,
    //   this.shopService.count(this.shopRequest),

    // ];

    const sub =
      this.shopService.select(this.shopRequest).subscribe(
        (response: any) => {
          this.dataSource.items = response;
          // const reader = new FileReader();
          // reader.onload = (e) => this.dataSource.items.image = e.target.result;
          this.dataSource.items.forEach(e => {
            let objectURL = 'data:image/jpeg;base64,' + e.imagePath;
            e.image = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
            // reader.readAsDataURL(new Blob(e.imagePath]));
          });
          // this.dataSource.paginatorTotal = response[1];
          this.loaded = true;
          if (this.cd && !this.cd['destroyed']) {
            this.cdr.detectChanges();
          }
        });

    this.cdr.detectChanges();
    this.subscriptions.push(sub);
    this.cdr.detectChanges();
  }
  changeCities() {
    this.shopRequest.districts = null;
    this.shopRequest.streets = null;
    if (this.shopRequest.cities[0]) {
      this.filteredDistricts = this.districts.filter(x => x.city == this.shopRequest.cities[0]);
      this.filteredStreets = this.districts.filter(x => x.city == this.shopRequest.cities[0]);
    }
    else {
      this.filteredDistricts = this.districts;
      this.filteredStreets = this.streets;
    }
  }
  changeStreets() {
    this.shopRequest.streets = null;
    if (this.shopRequest.districts[0]) {
      this.filteredStreets = this.streets.filter(x => x.city == this.shopRequest.districts[0]);
    }
    else {
      this.filteredStreets = this.streets;
    }
  }
}
