import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/core/module/partial/modules/shop/shop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public shopService: ShopService) { }

  ngOnInit(): void {
    this.shopService.isLoadingSubject.next(true);
  }

}
