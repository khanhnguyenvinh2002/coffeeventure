import { AuthService } from 'src/app/module/sticky/modules/auth/auth.service';
import { BaseListComponent } from './../../../module/sticky/component/base-list.component';
import { BaseFormComponent } from './../../../module/sticky/component/base-form.component';
import { ShopRequestPayload } from './../../../module/sticky/modules/shop/shop-request.payload';
import { ShopService } from 'src/app/module/sticky/modules/shop/shop.service';
import { JournalService } from './../../../module/sticky/modules/journal/journal.service';
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
  public items: MenuItem[];
  selectedCities1: any[];
  public districts: any;
  public streets: any;
  public cities: any;
  public categories: any;
  public userName: any;
  public filteredDistricts: any;
  public filteredStreets: any;
  public loaded = false;
  // public cities = [
  //   { name: 'New York', code: 'NY' },
  //   { name: 'Rome', code: 'RM' },
  //   { name: 'London', code: 'LDN' },
  //   { name: 'Istanbul', code: 'IST' },
  //   { name: 'Paris', code: 'PRS' }
  // ];

  // public countries = [
  //   { name: 'Australia', code: 'AU' },
  //   { name: 'Brazil', code: 'BR' },
  //   { name: 'China', code: 'CN' },
  //   { name: 'Egypt', code: 'EG' },
  //   { name: 'France', code: 'FR' },
  //   { name: 'Germany', code: 'DE' },
  //   { name: 'India', code: 'IN' },
  //   { name: 'Japan', code: 'JP' },
  //   { name: 'Spain', code: 'ES' },
  //   { name: 'United States', code: 'US' }
  // ];

  // public groupedCities = [
  //   {
  //     label: 'Germany', value: 'de',
  //     items: [
  //       { label: 'Berlin', value: 'Berlin' },
  //       { label: 'Frankfurt', value: 'Frankfurt' },
  //       { label: 'Hamburg', value: 'Hamburg' },
  //       { label: 'Munich', value: 'Munich' }
  //     ]
  //   },
  //   {
  //     label: 'USA', value: 'us',
  //     items: [
  //       { name: 'Chicago', value: 'Chicago' },
  //       { name: 'Los Angeles', value: 'Los Angeles' },
  //       { name: 'New York', value: 'New York' },
  //       { name: 'San Francisco', value: 'San Francisco' }
  //     ]
  //   },
  //   {
  //     label: 'Japan', value: 'jp',
  //     items: [
  //       { name: 'Kyoto', value: 'Kyoto' },
  //       { name: 'Osaka', value: 'Osaka' },
  //       { name: 'Tokyo', value: 'Tokyo' },
  //       { name: 'Yokohama', value: 'Yokohama' }
  //     ]
  //   }
  // ];
  // public shops = [
  //   { id: "Dec19_1", image: "Dec_26_2019.jpeg", header: "Dec 26 2019", class: "img-ver", content: "Đưa em hâm đi chơi phố" },
  //   { id: "Dec19_2", image: "Dec_31_2019.jpeg", header: "Dec 31 2019", class: "img-ver", content: "Đưa em hâm đi countdown" },
  //   { id: "Jan20_1", image: "Jan_14_2020.jpeg", header: "Jan 14 2020", class: "img-ver", content: "Đưa em hâm đi cafe" },
  //   { id: "Jan20_2", image: "Jan_18_2020.jpeg", header: "Jan 18 2020", class: "img-ver", content: "Đưa em hâm đi prom" },
  //   { id: "Feb20", image: "Feb_7_2020.jpeg", header: "Feb 7 2020", class: "img-ver", content: "Đưa em hâm đi hồ Giảng Võ" },
  //   { id: "Mar20_1", image: "Mar_4_2020.jpeg", header: "Mar 4 2020", class: "img-ver", content: "Đưa em hâm đi đánh răng" },
  //   { id: "Mar20_2", image: "May_22_2020.jpeg", header: "May 22 2020", class: "img-ver", content: "Đưa em hâm đi chụp ảnh phông đỏ" },
  //   { id: "Jun20", image: "Jun_14_2020.jpeg", header: "Jun 14 2020", class: "img-ver", content: "Đưa em hâm đi chụp kỉ yếu với lớp" },
  //   { id: "Jul20_1", image: "Jul_7_2020.jpeg", header: "Jul 7 2020", class: "img-ver", content: "Đưa em hâm đi ngắm sen Hồ Tây" },
  //   { id: "Jul20_2", image: "Jul_23_2020.jpeg", header: "Jul 23 2020", class: "img-ver", content: "Đưa em hâm đi ship nhãn" },
  //   { id: "Aug20", image: "Aug_21_2020.jpeg", header: "Aug 21 2020", class: "img-ver", content: "Đưa em hâm đi đâu chẳng bít" },
  //   { id: "Oct20_1", image: "Oct_1_2020.jpeg", header: "Oct 1 2020", class: "img-ver", content: "Đưa em hâm đi ngắm đèn lòn" },
  //   { id: "Oct20_2", image: "Oct_10_2020.jpeg", header: "Oct 10 2020", class: "img-ver", content: "Đưa em hâm đi sắm áo đôi" },
  //   { id: "Oct20_3", image: "Oct_20_2020.jpeg", header: "Oct 20 2020", class: "img-ver", content: "Đưa em hâm đi ăn sinh nhật anh bíu" },
  //   { id: "Nov20", image: "Nov_27_2020.jpeg", header: "Nov 27 2020", class: "img-ver", content: "Đưa em hâm đi mua áo đôi nhưng mà không mua" },
  //   { id: "Dec20", image: "Dec_30_2020.jpeg", header: "Dec 30 2020", class: "img-ver", content: "Đưa em hâm đi ma di ót ăn bằng tiền mẹ em" },
  //   { id: "Jan21", image: "Jan_16_2021.jpeg", header: "Jan 16 2021", class: "img-ver", content: "Đưa em hâm đi ngắm mũ" },
  //   { id: "Feb21", image: "Feb_9_2021.jpeg", header: "Feb 9 2021", class: "img-ver", content: "Đưa em hâm đi làm cứt" },
  //   { id: "Mar21", image: "Mar_6_2021.jpeg", header: "Mar 6 2021", class: "img-ver", content: "Đưa bữa tối đi ăn bữa trưa" },];
  constructor(private journalService: JournalService, private router: Router, private shopService: ShopService, private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer, private authService: AuthService) { super(); }

  ngOnInit(): void {
    this.userName = this.authService.getUser();
    this.journalService.getAll().subscribe(res => {
      for (let i = 0; i < 4; i++) {
        console.log(res);
        this.headerJournal[i].content = res[i] ? res[i].content : this.headerJournal[i].content;
        this.headerJournal[i].date = res[i] ? res[i].createdAt : this.headerJournal[i].date;
      }
    });
    this.shopRequest.pageIndex = 0;
    this.shopRequest.pageSize = 10;
    this.initShop();
    this.shopService.selectShopSearch().subscribe(res => {
      this.cities = res.cities;
      this.districts = res.districts;
      this.streets = res.streets;
      this.filteredStreets = res.streets;
      this.filteredDistricts = res.districts;
      this.categories = res.categories;
    })
    this.shopService.getShopCategory().pipe(map(response => {
      const treeData = [];
      for (const item of response) {
        const parentNode: MenuItem = {
          label: item.name,
          id: item.id,
          routerLink: item.link,
          expanded: false
        };
        treeData.push(parentNode);

      }
      return treeData;
    })).subscribe(res =>
      this.items[0].items = res)
  }
  goToShopItem(id: string) {
    this.router.navigate(['/app/shop/shop-item', id]);
  }
  // public formatDate(date): string {
  //   if (date) {
  //     return date.getFullYear()
  //       + '-' + this.leftpad(date.getMonth() + 1, 2)
  //       + '-' + this.leftpad(date.getDate(), 2)
  //       + ' ' + this.leftpad(date.getHours(), 2)
  //       + ':' + this.leftpad(date.getMinutes(), 2)
  //       + ':' + this.leftpad(date.getSeconds(), 2);
  //   }
  // }
  public checkAuth() {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    return false
  }
  public initShop(): void {
    this.loaded = false;
    const $selectAndCount = [
      this.shopService.select(this.shopRequest),
      this.shopService.count(this.shopRequest),

    ];
    const sub = forkJoin($selectAndCount).subscribe(
      (response: any[]) => {
        this.dataSource.items = response[0];
        // const reader = new FileReader();
        // reader.onload = (e) => this.dataSource.items.image = e.target.result;
        this.dataSource.items.forEach(e => {
          let objectURL = 'data:image/jpeg;base64,' + e.imagePath;
          e.image = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
          console.log(e.image);
          // reader.readAsDataURL(new Blob(e.imagePath]));
        });
        this.dataSource.paginatorTotal = response[1];
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
