import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// import { Loader } from '@googlemaps/js-api-loader';
// import { google } from "google-maps";
import tt from '@tomtom-international/web-sdk-maps';
import { TomtomMapService } from 'src/app/module/sticky/modules/maps/tomtom-map.service';
import { User } from './user';
// declare var google : google;
@Component({
  selector: 'app-shop-google-api',
  templateUrl: './shop-google-api.component.html',
  styleUrls: ['./shop-google-api.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShopGoogleApiComponent implements OnInit {
  title = 'my-map-app';
  userData:User[];
  map:any;
  marker:any;
 speedyPizzaCoordinates = [21.016028, 105.800520];
  constructor(
    private httpclient: HttpClient,
    private mapService: TomtomMapService
  ) {  }

  ngOnInit() {
    this.mapService.geoCoding("Athena coffee hanoi");
    this.map = tt.map({
      container: 'map',
      key: 'PNAk0ku7BFNMCaRADAGi0c45eDwbYPJv',
      center: [21.016028, 105.800520],
      zoom: 15
  });
  let marker = new tt.Marker().setLngLat([21.016028, 105.800520]).addTo(this.map);
  
  let popup = new tt.Popup({offset: {
    top: [0, 0],
    bottom: [0, -70],
    'bottom-right': [0, -70],
    'bottom-left': [0, -70],
    left: [25, -35],
    right: [-25, -35]
  }}).setHTML("<b>Speedy's pizza</b><br/>100 Century Center Ct 210, San Jose, CA 95112, USA");

  marker.setPopup(popup).togglePopup();
  
    // this.map = tt.map({
    //   key: 'PNAk0ku7BFNMCaRADAGi0c45eDwbYPJv',
    //   container: 'map',
    //   style: 'tomtom://vector/1/basic-main',
    //   zoom:1.2
    // });
    // this.map.addControl(new tt.FullscreenControl());
    // this.map.addControl(new tt.NavigationControl());
    // this.getJsonData();
  }

  getJsonData() {
    this.httpclient.get<User[]>('https://jsonplaceholder.typicode.com/users').subscribe((res) => {
      this.userData = res;
      for (var i=0;i<this.userData.length;i++) {
        this.marker = new tt.Marker({draggable:false})
            .setLngLat([this.userData[i].address.geo.lng,this.userData[i].address.geo.lat])
            .addTo(this.map);
      }
    });
  }
  search(){
//  this.mapService.searchWithQuery().then(function(response) {
//   map = tt.map({
// 	key: API_KEY,
// 	container: 'map-div',
// 	center: response.results[0].position,
// 	zoom: 12
//   });
// });
  }
  // public loader = new Loader({
  //   apiKey: "AIzaSyDWNDDD0MQb2ChE1D47n82gre3qSU-DHCE",
  //   version: "weekly",
  // });
  
  // ngOnInit(): void {
  //   this.loader.load().then(() => {
  //     let map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
  //       center: { lat: 21.0278, lng: 105.8342 },
  //       zoom: 8,
  //     });
  //   });
  // }
  
  
}
