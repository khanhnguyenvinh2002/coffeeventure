// import { Component, OnInit } from '@angular/core';
// import Map from 'ol/Map';
// import View from 'ol/View';
// import VectorLayer from 'ol/layer/Vector';
// import Style from 'ol/style/Style';
// import Icon from 'ol/style/Style';
// import OSM from 'ol/source/OSM';
// import * as olProj from 'ol/proj';
// import TileLayer from 'ol/layer/Tile';
// @Component({
//   selector: 'app-shop-osm-api',
//   templateUrl: './shop-osm-api.component.html',
//   styleUrls: ['./shop-osm-api.component.css']
// })
// export class ShopOsmApiComponent implements OnInit {
//   map: any;
//   constructor() { }

//   ngOnInit(): void {
//     this.map = new Map({
//       target:'hotel_map',
//       layers:[
//         new TileLayer({
//           source: new OSM()
//         })
//       ],
//       view: new View({
//         center: olProj.fromLonLat([7.0785,51.4614]),
//         zoom: 5
//       })
//     })
//   }

// }
import { Component, OnInit } from '@angular/core';
// declare var ol: any;
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Style';
import OSM from 'ol/source/OSM';
import Vector from 'ol/source/Vector';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
@Component({
  selector: 'app-shop-osm-api',
  templateUrl: './shop-osm-api.component.html',
  styleUrls: ['./shop-osm-api.component.css']
})
export class ShopOsmApiComponent {
  // map: any;
  // constructor() { }

  // latitude: number = -16.509418;
  // longitude: number = -68.124151;

  // ngOnInit() {
  //   this.map = new Map({
  //     target: 'map',
  //     layers:[
  //               new TileLayer({
  //                 source: new OSM()
  //               })
  //             ],
  //     view: new View({
  //       center: olProj.fromLonLat([this.longitude, this.latitude]),
  //       zoom: 12
  //     })
  //   });
  //   this.addPoint(this.latitude, this.longitude);
  // }

  // setCenter() {
  //   var view = this.map.getView();
  //   view.setCenter(olProj.fromLonLat([this.longitude, this.latitude]));
  //   view.addMarker(olProj.fromLonLat([this.longitude, this.latitude]));
  //   view.setZoom(12);
  // }

  // addPoint(lat: number, lng: number) {
  //   var vectorLayer = new VectorLayer({
  //     source: new Vector({
  //       features: [new Feature({
  //         geometry: new Point(olProj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857')),
  //       })]
  //     }),
  //     style: new Style({
  //       image: new Icon({
  //         anchor: [0.5, 0.5],
  //         anchorXUnits: "fraction",
  //         anchorYUnits: "fraction",
  //         src: "assets/img/cf_bg1.jpg"
  //       })
  //     })
  //   });
  //   this.map.addLayer(vectorLayer);
  //   }
}
