import { JournalRequestPayload } from '../../../core/module/partial/modules/journal/journal-request.payload';
import { AuthService } from 'src/app/core/module/partial/modules/auth/auth.service';
import { BaseListComponent } from '../../../core/base/component/base-list.component';
import { BaseFormComponent } from '../../../core/base/component/base-form.component';
import { ShopRequestPayload } from '../../../core/module/partial/modules/shop/shop-request.payload';
import { ShopService } from 'src/app/core/module/partial/modules/shop/shop.service';
import { JournalService } from '../../../core/module/partial/modules/journal/journal.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as main from "./base-screen.config";
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuItem } from 'primeng/api/menuitem';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-base-screen',
  templateUrl: './base-screen.component.html',
  styleUrls: ['./base-screen.component.css']
})
export class BaseScreenComponent extends BaseListComponent implements OnInit {
  public headerJournal = main.BASE_JOURNAL;
  public shopRequest = new ShopRequestPayload();
  public dataSource: any = {};
  // public items: MenuItem[];
  selectedCities1: any[];
  public districts: any;
  public streets: any;
  public cities: any;
  public categories: any;
  public userName: any;
  public filteredDistricts: any;
  public filteredStreets: any;
  public loaded = false;
  constructor(private journalService: JournalService, private router: Router, private shopService: ShopService, private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer, private authService: AuthService) { super(); }

  ngOnInit(): void {
    this.userName = this.authService.getUser();
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

  goToShopItem(id: string) {
    this.router.navigate(['/app/shop/shop-item', id]);
  }

  public checkAuth() {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    return false
  }
  public initShop(): void {
    this.shopRequest.pageIndex = 0;
    this.shopRequest.pageSize = 12;
    this.loaded = false;
    const $selectAndCount = [
      this.shopService.select(this.shopRequest),
      this.shopService.count(this.shopRequest)];

    const sub = forkJoin($selectAndCount).subscribe(
      (response: any[]) => {
        this.dataSource.items = response[0];
        this.dataSource.paginatorTotal = response[1];
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
  public onPageChange(event: PageEvent) {
    this.shopRequest.pageIndex = event.pageIndex;
    this.shopRequest.pageSize = event.pageSize;
    this.initShop();
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
