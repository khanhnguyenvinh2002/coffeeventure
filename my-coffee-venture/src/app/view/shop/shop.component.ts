import { BaseListComponent } from 'src/app/core/base/component/base-list.component';
import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { JournalService } from 'src/app/core/module/partial/modules/journal/journal.service';
import { ShopRequestPayload } from 'src/app/core/module/partial/modules/shop/shop-request.payload';
import { ShopService } from 'src/app/core/module/partial/modules/shop/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent extends BaseListComponent implements OnInit {
  public shopRequest = new ShopRequestPayload();
  public dataSource: any = {};
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
  }
  /**
   * go to shop item
   * @param id shop id
   */
  public goToShopItem(id: string) {
    this.router.navigate(['/app/shop/shop-item', id]);
  }
  /**
   * scroll dơn event
   */
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
          e.image = e.imagePath;
        });
        this.loaded = true;
        this.dataSource.items = this.dataSource.items ? this.dataSource.items.concat(response) : response;
      });

  }
  /**
   * initialize shops
   */
  public initShop(): void {
    this.shopRequest.pageIndex = 0;
    this.shopRequest.pageSize = 12;
    this.loaded = false;
    const sub =
      this.shopService.select(this.shopRequest).subscribe(
        (response: any) => {
          this.dataSource.items = response;
          if (this.dataSource.items && this.dataSource.items.length > 0) {
            this.dataSource.items.forEach(e => {
              e.image = e.imagePath ? e.imagePath : 'assets/img/cf_bg1.jpg';
            });
          }
          this.loaded = true;
          if (this.cd && !this.cd['destroyed']) {
            this.cdr.detectChanges();
          }
        });

    this.cdr.detectChanges();
    this.subscriptions.push(sub);
    this.cdr.detectChanges();
  }

  /**
   * event change city
   */
  public changeCities() {
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
  /**
   * event change streets
   */
  public changeStreets() {
    this.shopRequest.streets = null;
    if (this.shopRequest.districts[0]) {
      this.filteredStreets = this.streets.filter(x => x.city == this.shopRequest.districts[0]);
    }
    else {
      this.filteredStreets = this.streets;
    }
  }
}
