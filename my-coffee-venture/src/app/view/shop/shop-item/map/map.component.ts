import { Component, OnInit } from '@angular/core';
import { MapPoint } from '../map-point-form/map-point.model';
import {icon, latLng, LeafletMouseEvent, Map, MapOptions, marker, tileLayer} from 'leaflet';
import { NominatimResponse } from 'src/app/core/module/partial/modules/maps/nominatim-response.model';
import {DEFAULT_LATITUDE, DEFAULT_LONGITUDE} from '../../../../core/module/partial/modules/maps/constants.model';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: Map;
  mapPoint: MapPoint[];
  options: MapOptions;
  lastLayer: any;
  centerLayer: any;
location : any;
  results: NominatimResponse[];
  center: MapPoint;
  constructor () {
  }

  ngOnInit () {
    this.initializeDefaultMapPoint();
    this.initializeMapOptions();
  }

  initializeMap (map: Map) {
    this.map = map;
    this.createMarker(false);
  }
  calculateDistance(){
    if(this.center && this.mapPoint && this.mapPoint.length >1){
      console.log(this.mapPoint.map(x=> this.distance(x.latitude,x.longitude,this.center.latitude,this.center.longitude)))
    }
  }
//  distance(lat1,lon1,lat2,lon2) {
//     var R = 6371; // Radius of the earth in km
//     var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
//     var dLon = this.deg2rad(lon2-lon1); 
//     var a = 
//       Math.sin(dLat/2) * Math.sin(dLat/2) +
//       Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
//       Math.sin(dLon/2) * Math.sin(dLon/2)
//       ; 
//     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
//     var d = R * c; // Distance in km
//     return d;
//   }
  
//   deg2rad(deg) {
//     return deg * (Math.PI/180)
//   }
  distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
  
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }
  getAddress (result: NominatimResponse) {
    this.updateMapPoint(result.latitude, result.longitude, result.displayName);
    this.createMarker(false);
  }

  refreshSearchList (results: NominatimResponse[]) {
    this.results = results;
  }
  onMapAdd(e: NominatimResponse){
    this.updateMapPoint(e.latitude, e.longitude);
    this.createMarker(false);
    if(this.mapPoint && this.mapPoint.length > 1){
      let lat = this.mapPoint.map(x=>  x.latitude).reduce((a, b) => a + b, 0)/this.mapPoint.length;
      let lon = this.mapPoint.map(x=>  x.longitude).reduce((a, b) => a + b, 0)/this.mapPoint.length;
      this.center = {
      name: 'center',
      latitude: lat,
      longitude: lon
      };
      // this.mapPoint.push(this.center);
      this.createMarker(true);
      // this.mapPoint.pop();
    }
    this.calculateDistance();
  }
  onMapClick (e: LeafletMouseEvent) {
    // this.clearMap();
    this.updateMapPoint(e.latlng.lat, e.latlng.lng);
    this.createMarker(false);
    if(this.mapPoint && this.mapPoint.length > 1){
      let lat = this.mapPoint.map(x=>  x.latitude).reduce((a, b) => a + b, 0)/this.mapPoint.length;
      let lon = this.mapPoint.map(x=>  x.longitude).reduce((a, b) => a + b, 0)/this.mapPoint.length;
      this.center = {
      name: 'center',
      latitude: lat,
      longitude: lon
      };
      // this.mapPoint.push(this.center);
      this.createMarker(true);
      // this.mapPoint.pop();
    }

    this.calculateDistance();
  }

  private initializeMapOptions () {
    this.options = {
      zoom: 15,
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 20, attribution: 'OSM'})
      ]
    }
  }

  private initializeDefaultMapPoint () {
    this.mapPoint = [{
      name: 'Hello',
      latitude: DEFAULT_LATITUDE,
      longitude: DEFAULT_LONGITUDE
    }];
  }

  private updateMapPoint (latitude: number, longitude: number, name?: string) {
    this.mapPoint.push( {
      latitude: latitude,
      longitude: longitude,
      name: name ? name : this.mapPoint[this.mapPoint.length-1].name
    });
   
  }

  private createMarker (isCenter: boolean) {
    // this.clearMap();
    if(isCenter){
      this.clearCenter();
      const mapIcon = this.getDefaultIcon();
      const coordinates = latLng([this.center.latitude, this.center.longitude]);
      this.location = coordinates;
      this.centerLayer = marker(coordinates).setIcon(mapIcon).addTo(this.map);
      this.centerLayer.bindPopup('This is the center<br>Hello.').openPopup();
    //   marker([51.5, -0.09]).addTo(this.map)
    // .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    // .openPopup()
      this.map.setView(coordinates, this.map.getZoom());
    }
    else{
      const mapIcon = this.getDefaultIcon();
      const coordinates = latLng([this.mapPoint[this.mapPoint.length-1].latitude, this.mapPoint[this.mapPoint.length-1].longitude]);
      this.location = coordinates;
      this.lastLayer = marker(coordinates).setIcon(mapIcon).addTo(this.map);
      this.map.setView(coordinates, this.map.getZoom());
    }
  }

  private getDefaultIcon () {
    return icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'https://unpkg.com/leaflet@1.3.3/dist/images/marker-icon-2x.png'
    });
  }
  private clearCenter(){
    if (this.map.hasLayer(this.centerLayer)) this.map.removeLayer(this.centerLayer);
  }
  private clearMap () {
    if (this.map.hasLayer(this.lastLayer)) this.map.removeLayer(this.lastLayer);
  }
}
