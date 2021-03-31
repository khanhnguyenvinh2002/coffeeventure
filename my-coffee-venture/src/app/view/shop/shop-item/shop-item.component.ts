import { ShopService } from 'src/app/module/sticky/modules/shop/shop.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.css']
})
export class ShopItemComponent implements OnInit {
  id: string;
  private sub: any;
  public shopItem: any = {};
  constructor(private route: ActivatedRoute, private shopService: ShopService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      // this.id = +params['id']; // (+) converts string 'id' to a number
      this.id = params['id'];
      this.shopService.selectById(this.id).subscribe(res => {
        this.shopItem = res;
      })
      // In a real app: dispatch action to load the details here.
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
